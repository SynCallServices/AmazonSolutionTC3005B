/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      videoId
      agentId
      videoPath
      id
      createdAt
      updatedAt
      agentVideosId
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
        videoPath
        id
        createdAt
        updatedAt
        agentVideosId
      }
      nextToken
    }
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
      agentId
      videos {
        items {
          videoId
          agentId
          videoPath
          id
          createdAt
          updatedAt
          agentVideosId
        }
        nextToken
      }
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
        videos {
          nextToken
        }
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
      voicePath
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
        voicePath
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
