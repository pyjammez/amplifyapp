/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      owner
      name
      section
      var1
      var2
      var3
      datetime
      time
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      owner
      name
      section
      var1
      var2
      var3
      datetime
      time
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      owner
      name
      section
      var1
      var2
      var3
      datetime
      time
      createdAt
      updatedAt
    }
  }
`;
export const createProfileSetting = /* GraphQL */ `
  mutation CreateProfileSetting(
    $input: CreateProfileSettingInput!
    $condition: ModelProfileSettingConditionInput
  ) {
    createProfileSetting(input: $input, condition: $condition) {
      id
      showExercise
      showDiet
      showMeasurements
      showSupplements
      showPhotos
      use24Hours
      dateFormat
      useMetric
      pro
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateProfileSetting = /* GraphQL */ `
  mutation UpdateProfileSetting(
    $input: UpdateProfileSettingInput!
    $condition: ModelProfileSettingConditionInput
  ) {
    updateProfileSetting(input: $input, condition: $condition) {
      id
      showExercise
      showDiet
      showMeasurements
      showSupplements
      showPhotos
      use24Hours
      dateFormat
      useMetric
      pro
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteProfileSetting = /* GraphQL */ `
  mutation DeleteProfileSetting(
    $input: DeleteProfileSettingInput!
    $condition: ModelProfileSettingConditionInput
  ) {
    deleteProfileSetting(input: $input, condition: $condition) {
      id
      showExercise
      showDiet
      showMeasurements
      showSupplements
      showPhotos
      use24Hours
      dateFormat
      useMetric
      pro
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createRoutine = /* GraphQL */ `
  mutation CreateRoutine(
    $input: CreateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    createRoutine(input: $input, condition: $condition) {
      id
      owner
      everyday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
      sunday
      createdAt
      updatedAt
    }
  }
`;
export const updateRoutine = /* GraphQL */ `
  mutation UpdateRoutine(
    $input: UpdateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    updateRoutine(input: $input, condition: $condition) {
      id
      owner
      everyday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
      sunday
      createdAt
      updatedAt
    }
  }
`;
export const deleteRoutine = /* GraphQL */ `
  mutation DeleteRoutine(
    $input: DeleteRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    deleteRoutine(input: $input, condition: $condition) {
      id
      owner
      everyday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
      sunday
      createdAt
      updatedAt
    }
  }
`;
