import { createElement } from "react";
import { ReactQuestionFactory } from "survey-react-ui";
import { Question, Serializer } from "survey-core";
import { SurveyQuestionPhotoTaker } from "components/photo/SurveyQuestionElementBase";

// Definimos un nombre para nuestro tipo
const CUSTOM_PHOTO_TYPE = "photo";

class QuestionPhotoModel extends Question {
  public getType(): string {
    return CUSTOM_PHOTO_TYPE;
  }
}

export function registerPhotoTakerWidget() {
  // Opcional pero recomendado: Registrar el tipo en el Serializer
  // para que el modelo base lo conozca.
  Serializer.addClass(
    CUSTOM_PHOTO_TYPE,
    [],
    () => new QuestionPhotoModel(""),
    "question"
  );

  // El registro específico de React. Esto es todo lo que se necesita.
  ReactQuestionFactory.Instance.registerQuestion(CUSTOM_PHOTO_TYPE, (props) => {
    return createElement(SurveyQuestionPhotoTaker, props);
  });
}
