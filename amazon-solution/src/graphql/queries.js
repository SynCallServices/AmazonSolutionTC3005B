/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideo = /* GraphQL */ `
  query GetVideo($videoId: ID!, $agentId: String!) {
    getVideo(videoId: $videoId, agentId: $agentId) {
      videoId
      agentId
      path
      startTime
      title
      duration
      createdAt
      updatedAt
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $videoId: ID
    $agentId: ModelStringKeyConditionInput
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVideos(
      videoId: $videoId
      agentId: $agentId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        videoId
        agentId
        path
        startTime
        title
        duration
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($agentId: ID!, $folder: String!) {
    getAgent(agentId: $agentId, folder: $folder) {
      agentId
      folder
      assignedVideos
      createdAt
      updatedAt
    }
  }
`;
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $agentId: ID
    $folder: ModelStringKeyConditionInput
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAgents(
      agentId: $agentId
      folder: $folder
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        agentId
        folder
        assignedVideos
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVoice = /* GraphQL */ `
  query GetVoice($voiceId: ID!, $agentId: String!) {
    getVoice(voiceId: $voiceId, agentId: $agentId) {
      voiceId
      agentId
      path
      startTime
      createdAt
      updatedAt
    }
  }
`;
export const listVoices = /* GraphQL */ `
  query ListVoices(
    $voiceId: ID
    $agentId: ModelStringKeyConditionInput
    $filter: ModelVoiceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVoices(
      voiceId: $voiceId
      agentId: $agentId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        voiceId
        agentId
        path
        startTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecording = /* GraphQL */ `
  query GetRecording($recordingId: ID!, $path: String!) {
    getRecording(recordingId: $recordingId, path: $path) {
      recordingId
      path
      createdAt
      updatedAt
    }
  }
`;
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $recordingId: ID
    $path: ModelStringKeyConditionInput
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRecordings(
      recordingId: $recordingId
      path: $path
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        recordingId
        path
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const videoByTitleAndDuration = /* GraphQL */ `
  query VideoByTitleAndDuration(
    $title: String!
    $duration: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    videoByTitleAndDuration(
      title: $title
      duration: $duration
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        videoId
        agentId
        path
        startTime
        title
        duration
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
