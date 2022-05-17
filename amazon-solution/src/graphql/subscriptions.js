/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo {
    onCreateVideo {
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
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo {
    onUpdateVideo {
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
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo {
    onDeleteVideo {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
      agentId
      videos {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
      agentId
      videos {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
      agentId
      videos {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVoice = /* GraphQL */ `
  subscription OnCreateVoice {
    onCreateVoice {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVoice = /* GraphQL */ `
  subscription OnUpdateVoice {
    onUpdateVoice {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVoice = /* GraphQL */ `
  subscription OnDeleteVoice {
    onDeleteVoice {
      voiceId
      agentId
      voicePath
      id
      createdAt
      updatedAt
    }
  }
`;
