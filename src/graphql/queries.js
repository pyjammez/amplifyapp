/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProfileSetting = /* GraphQL */ `
  query GetProfileSetting($id: ID!) {
    getProfileSetting(id: $id) {
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
export const listProfileSettings = /* GraphQL */ `
  query ListProfileSettings(
    $filter: ModelProfileSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRoutine = /* GraphQL */ `
  query GetRoutine($id: ID!) {
    getRoutine(id: $id) {
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
export const listRoutines = /* GraphQL */ `
  query ListRoutines(
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getItemsByOwnerByDatetime = /* GraphQL */ `
  query GetItemsByOwnerByDatetime(
    $owner: String
    $datetime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getItemsByOwnerByDatetime(
      owner: $owner
      datetime: $datetime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRoutinesByOwnerByCreatedAt = /* GraphQL */ `
  query GetRoutinesByOwnerByCreatedAt(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRoutinesByOwnerByCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
