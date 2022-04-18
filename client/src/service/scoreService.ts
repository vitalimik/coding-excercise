import { AVG_SCORE, INIT_AVG_SCORE } from "../constants";
import { ApiService } from "./apiService";

export class ScoreService {
  static async getAvgScore(newScore: number) {
    const response = await ApiService.post(AVG_SCORE, {
      newScore,
    });
    return response.data;
  }

  static async getInitAvgScore() {
    const response = await ApiService.get(INIT_AVG_SCORE);
    return response.data;
  }
}
