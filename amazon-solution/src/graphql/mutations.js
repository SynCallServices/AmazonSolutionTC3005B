/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
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
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
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
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
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
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
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
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
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
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
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
export const createVoice = /* GraphQL */ `
  mutation CreateVoice(
    $input: CreateVoiceInput!
    $condition: ModelVoiceConditionInput
  ) {
    createVoice(input: $input, condition: $condition) {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateVoice = /* GraphQL */ `
  mutation UpdateVoice(
    $input: UpdateVoiceInput!
    $condition: ModelVoiceConditionInput
  ) {
    updateVoice(input: $input, condition: $condition) {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteVoice = /* GraphQL */ `
  mutation DeleteVoice(
    $input: DeleteVoiceInput!
    $condition: ModelVoiceConditionInput
  ) {
    deleteVoice(input: $input, condition: $condition) {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
