import { gql } from "@apollo/client";

export const CREATE_JOBS = gql`
  mutation CreateJob($CreateJobDto: CreateJobDto!) {
    Create_jobs(CreateJobDto: $CreateJobDto) {
      title
      customUrl
    }
  }
`;

export const GET_ALL_JOBS = gql`
  query {
    get_All_jobs {
      id
      title
      customUrl
      location
      jobType
      salary
      isFilled
      description
      responsibilities
      requirements
      benefits
      apply
      canonicalTag
      metaDescription
      metaTitle
      createdAt
      updatedAt
      status
    }
  }
`;

export const UPDATE_JOBS = gql`
  mutation UpdateJob($UpdateCreateJobDto: UpdateCreateJobDto!) {
    update_jobs(UpdateCreateJobDto: $UpdateCreateJobDto) {
      title
      customUrl
    }
  }
`;

export const GET_SINGLE_JOB = gql`
  query GetSingleJob($customUrl: String!) {
    get_single_job(customUrl: $customUrl) {
      id
      title
      customUrl
      location
      jobType
      salary
      isFilled
      description
      responsibilities
      requirements
      benefits
      apply
      status
    }
  }
`;
export const GET_SINGLE_JOB_META_DESCRIPTION = gql`
  query GetSingleJob($customUrl: String!) {
    get_single_job(customUrl: $customUrl) {
      canonicalTag
      metaDescription
      metaTitle
      customUrl
    }
  }
`;

export const DELETE_JOBS = gql`
  mutation DeleteJob($id: Int!) {
    Delete_jobs(id: $id) {
      id
      title
    }
  }
`;

// Jobs Applications

export const CREATE_JOB_APPLICATION = gql`
  mutation CreateJobApplication($CreateJobDto: CreateJobApplicationDto!) {
    Create_jobs_applications(CreateJobDto: $CreateJobDto) {
      id
      firstName
      lastName
      email
      phone
      currentCTC
      expectedCTC
      noticePeriod
      JobName
      resume
      portfolioLink
    }
  }
`;

export const GET_ALL_JOB_APPLICATIONS = gql`
  query {
    get_All_jobs_applications {
      id
      firstName
      lastName
      email
      phone
      currentCTC
      expectedCTC
      noticePeriod
      resume
      portfolioLink
      createdAt
    }
  }
`;

export const UPDATE_JOB_APPLICATION = gql`
  mutation UpdateJobApplication($UpdateCreateJobApplicationDto: UpdateCreateJobApplicationDto!) {
    update_jobs(UpdateCreateJobApplicationDto: $UpdateCreateJobApplicationDto) {
      id
      firstName
      lastName
      email
      phone
      currentCTC
      expectedCTC
      noticePeriod
      resume
      portfolioLink
    }
  }
`;

export const DELETE_JOB_APPLICATION = gql`
  mutation DeleteJobApplication($id: Int!) {
    Delete_jobs(id: $id) {
      id
      email
    }
  }
`;
