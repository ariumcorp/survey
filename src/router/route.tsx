import ValidateLoginProvider from "provider/ValidateLoginProvider";
import { createBrowserRouter } from "react-router";
import {
  AnswerSurvey,
  Layout,
  Login,
  SurveyConfig,
  SurveyDashboard,
  Surveys,
} from "../features";
import { PagePath } from "../utils/enums";

export const router = createBrowserRouter([
  {
    path: PagePath.Root,
    element: (
      <ValidateLoginProvider>
        <Layout />
      </ValidateLoginProvider>
    ),
    children: [
      // { index: true, element: <Main /> },
      { index: true, element: <Surveys /> },
      { path: PagePath.SurveysConfig, element: <SurveyConfig /> },
      { path: PagePath.AnswerSurvey, element: <AnswerSurvey /> },
      { path: PagePath.Dashboard, element: <SurveyDashboard /> },
    ],
  },
  {
    path: PagePath.Login,
    element: (
      <ValidateLoginProvider>
        <Login />
      </ValidateLoginProvider>
    ),
  },
]);
