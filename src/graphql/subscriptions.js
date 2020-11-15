/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($owner: String!) {
    onCreateItem(owner: $owner) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($owner: String!) {
    onUpdateItem(owner: $owner) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($owner: String!) {
    onDeleteItem(owner: $owner) {
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
export const onCreateProfileSetting = /* GraphQL */ `
  subscription OnCreateProfileSetting($owner: String!) {
    onCreateProfileSetting(owner: $owner) {
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
export const onUpdateProfileSetting = /* GraphQL */ `
  subscription OnUpdateProfileSetting($owner: String!) {
    onUpdateProfileSetting(owner: $owner) {
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
export const onDeleteProfileSetting = /* GraphQL */ `
  subscription OnDeleteProfileSetting($owner: String!) {
    onDeleteProfileSetting(owner: $owner) {
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
export const onCreateRoutine = /* GraphQL */ `
  subscription OnCreateRoutine($owner: String!) {
    onCreateRoutine(owner: $owner) {
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
export const onUpdateRoutine = /* GraphQL */ `
  subscription OnUpdateRoutine($owner: String!) {
    onUpdateRoutine(owner: $owner) {
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
export const onDeleteRoutine = /* GraphQL */ `
  subscription OnDeleteRoutine($owner: String!) {
    onDeleteRoutine(owner: $owner) {
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
