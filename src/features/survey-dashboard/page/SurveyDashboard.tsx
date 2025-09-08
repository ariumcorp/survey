import { AnimatedPage, SurveyAnalyticsDashboard } from "components";
import React from "react";
import {
  processedSurveysSelector,
  surveyBuilderSelector,
} from "redux-store/selectors";
import { useSelector } from "redux-store/store";

export const SurveyDashboard: React.FC = () => {
  const surveyPrincipal = useSelector(surveyBuilderSelector);
  const { processedSurveys } = useSelector(processedSurveysSelector);
  const answers: any[] = [];
  console.log("surveyPrincipal", surveyPrincipal);
  console.log("processedSurveys", processedSurveys);

  for (const survey of processedSurveys) {
    if (survey.surveyId === surveyPrincipal._id) answers.push(survey.answers);
  }
  console.log("answers", answers);
  return (
    <AnimatedPage>
      <SurveyAnalyticsDashboard
        surveyJson={surveyPrincipal}
        surveyResults={answers}
      />
    </AnimatedPage>
  );
};
