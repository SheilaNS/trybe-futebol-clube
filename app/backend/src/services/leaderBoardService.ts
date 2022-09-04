import MatchModel from '../database/models/match';
import MatchService from './matchService';
import TeamService from './teamService';

type ResultTeams = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

class LeaderService {
  private _teamService: TeamService;
  private _matchService: MatchService;

  constructor() {
    this._teamService = new TeamService();
    this._matchService = new MatchService();
  }

  private totalPoints = (array: MatchModel[], teamId: number) => {
    let totalPoints = 0;
    array.forEach((match) => {
      if (match.homeTeam === teamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      }
      // if (match.awayTeam === teamId) {
      //   if (match.homeTeamGoals < match.awayTeamGoals) totalPoints += 3;
      //   if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      // }
    });
    return totalPoints;
  };

  private totalGames = (array: MatchModel[], teamId: number) => {
    let totalGames = 0;
    array.forEach((match) => {
      if (match.homeTeam === teamId /* || match.awayTeam === teamId */) totalGames += 1;
    });
    return totalGames;
  };

  private totalVictories = (array: MatchModel[], teamId: number) => {
    let totalVictories = 0;
    array.forEach((e) => {
      if (e.homeTeam === teamId && e.homeTeamGoals > e.awayTeamGoals) totalVictories += 1;
      // if (e.awayTeam === teamId && e.homeTeamGoals < e.awayTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  };

  private totalLosses = (array: MatchModel[], teamId: number) => {
    let totalLosses = 0;
    array.forEach((e) => {
      if (e.homeTeam === teamId && e.homeTeamGoals < e.awayTeamGoals) totalLosses += 1;
      // if (e.awayTeam === teamId && e.homeTeamGoals > e.awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  };

  private totalDraws = (array: MatchModel[], teamId: number) => {
    let totalDraws = 0;
    array.forEach((e) => {
      if (e.homeTeam === teamId && e.homeTeamGoals === e.awayTeamGoals) totalDraws += 1;
      // if (e.awayTeam === teamId && e.homeTeamGoals === e.awayTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  };

  private totalGoals = (array: MatchModel[], teamId: number) => {
    let goalsFavor = 0;
    let goalsOwn = 0;
    array.forEach((e) => {
      if (e.homeTeam === teamId) {
        goalsFavor += e.homeTeamGoals;
        goalsOwn += e.awayTeamGoals;
      }
      // if (e.awayTeam === teamId) {
      //   goalsFavor += e.awayTeamGoals;
      //   goalsOwn += e.homeTeamGoals;
      // }
    });
    const goalsBalance = goalsFavor - goalsOwn;
    return ({ goalsFavor, goalsOwn, goalsBalance });
  };

  private efficiency = (totalPoints: number, totalGames: number) => {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  };

  private orderedResults = (array: ResultTeams[]) => array
    .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

  public listAll = async () => {
    const teams = await this._teamService.listAll();
    const allMatches = await this._matchService.filterByProgress(false);
    const teamsName = teams.map((team) => ({
      name: team.teamName,
      totalPoints: this.totalPoints(allMatches, team.id),
      totalGames: this.totalGames(allMatches, team.id),
      totalVictories: this.totalVictories(allMatches, team.id),
      totalDraws: this.totalDraws(allMatches, team.id),
      totalLosses: this.totalLosses(allMatches, team.id),
      goalsFavor: this.totalGoals(allMatches, team.id).goalsFavor,
      goalsOwn: this.totalGoals(allMatches, team.id).goalsOwn,
      goalsBalance: this.totalGoals(allMatches, team.id).goalsBalance,
      efficiency: this.efficiency(
        this.totalPoints(allMatches, team.id),
        this.totalGames(allMatches, team.id),
      ) }));
    const sorted = this.orderedResults(teamsName);
    return sorted;
  };
}

export default LeaderService;
