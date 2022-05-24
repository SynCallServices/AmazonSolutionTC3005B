/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      videoId
      agentId
      path
      id
      createdAt
      updatedAt
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        videoId
        agentId
        path
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
      agentId
      folder
      id
      createdAt
      updatedAt
    }
  }
`;
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        agentId
        folder
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVoice = /* GraphQL */ `
  query GetVoice($id: ID!) {
    getVoice(id: $id) {
      voiceId
      agentId
      path
      id
      createdAt
      updatedAt
    }
  }
`;
export const listVoices = /* GraphQL */ `
  query ListVoices(
    $filter: ModelVoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        voiceId
        agentId
        path
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecording = /* GraphQL */ `
  query GetRecording($id: ID!) {
    getRecording(id: $id) {
      recordingId
      agentId
      path
      id
      createdAt
      updatedAt
    }
  }
`;
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        recordingId
        agentId
        path
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
