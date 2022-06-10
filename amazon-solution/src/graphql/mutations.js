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
      path
      startTime
      endTime
      createdAt
      updatedAt
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
      path
      startTime
      endTime
      createdAt
      updatedAt
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
      path
      startTime
      endTime
      createdAt
      updatedAt
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
      folder
      asgnRec
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
      folder
      asgnRec
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
      folder
      asgnRec
      createdAt
      updatedAt
    }
  }
`;
export const createAssignedRecordings = /* GraphQL */ `
  mutation CreateAssignedRecordings(
    $input: CreateAssignedRecordingsInput!
    $condition: ModelAssignedRecordingsConditionInput
  ) {
    createAssignedRecordings(input: $input, condition: $condition) {
      recordingId
      agentId
      expirationDate
      assignId
      createdAt
      updatedAt
    }
  }
`;
export const updateAssignedRecordings = /* GraphQL */ `
  mutation UpdateAssignedRecordings(
    $input: UpdateAssignedRecordingsInput!
    $condition: ModelAssignedRecordingsConditionInput
  ) {
    updateAssignedRecordings(input: $input, condition: $condition) {
      recordingId
      agentId
      expirationDate
      assignId
      createdAt
      updatedAt
    }
  }
`;
export const deleteAssignedRecordings = /* GraphQL */ `
  mutation DeleteAssignedRecordings(
    $input: DeleteAssignedRecordingsInput!
    $condition: ModelAssignedRecordingsConditionInput
  ) {
    deleteAssignedRecordings(input: $input, condition: $condition) {
      recordingId
      agentId
      expirationDate
      assignId
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
      path
      startTime
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
      path
      startTime
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
      path
      startTime
      createdAt
      updatedAt
    }
  }
`;
export const createRecording = /* GraphQL */ `
  mutation CreateRecording(
    $input: CreateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    createRecording(input: $input, condition: $condition) {
      recordingId
      path
      title
      duration
      createdAt
      updatedAt
    }
  }
`;
export const updateRecording = /* GraphQL */ `
  mutation UpdateRecording(
    $input: UpdateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    updateRecording(input: $input, condition: $condition) {
      recordingId
      path
      title
      duration
      createdAt
      updatedAt
    }
  }
`;
export const deleteRecording = /* GraphQL */ `
  mutation DeleteRecording(
    $input: DeleteRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    deleteRecording(input: $input, condition: $condition) {
      recordingId
      path
      title
      duration
      createdAt
      updatedAt
    }
  }
`;
