import { IconType } from "react-icons";
import { ProductImage } from "./prod";
import { BlogStatus } from "./general";

export interface ReasonType {
  icon: IconType;
  title: string;
  description: string;
}

export interface PositionType {
  title: string;
  isFilled: boolean;
  slug: string;
}


export interface CareerType {
  slug: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string;
  howToApply: string;
}


export interface OptonsFiels {
  name: string,
  detail?: string[]
}


export interface IJOBS {
  id: number
  custom_url: string;
  title: string;
  location: string;
  jobType: string;
  salary: string;
  isFilled: boolean;
  description: string;
  responsibilities: OptonsFiels[];
  requirements: OptonsFiels[];
  benefits: OptonsFiels[];
  apply: OptonsFiels[];
  Canonical_Tag?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  createdAt: string;
  updatedAt?: string
  status?:BlogStatus
}

export interface initialJobsTypes extends Omit<IJOBS, "id"> {
  isFilled?: boolean
  createdAt?: string;

}


export interface PositionType {
  title: string;
  slug: string;
  isFilled: boolean;
}
export interface UploadedResume extends ProductImage {
  name?: string;
}

export interface JobApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  resume: UploadedResume | null;
  portfolioLink: string;
}