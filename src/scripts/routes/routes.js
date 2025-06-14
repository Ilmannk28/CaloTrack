import ArticlePage from "../pages/Article/article-page";
import CalculatePage from "../pages/Calculate/calculate-page";
import HomePage from "../pages/Home/home-page";
import PredictPage from "../pages/Predict/predict-page";
import RecommendationPage from "../pages/Recommendation/recommendation-page";

export const routes = {
    '/': HomePage,          
    '/home': HomePage,
    '/calculate': CalculatePage,
    '/predict': PredictPage,
    '/recommendation' : RecommendationPage,
      '/articles': ArticlePage,
    '*': HomePage
}

