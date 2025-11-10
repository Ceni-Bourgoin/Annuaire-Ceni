
export interface Member {
  id: string;
  companyLogo: string;
  companyName: string;
  activity: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  caption: string;
}

export enum SearchCriteria {
    CompanyName = 'companyName',
    Activity = 'activity',
    ContactName = 'contactName',
}
   