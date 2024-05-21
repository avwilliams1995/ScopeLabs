import { Dispatch, SetStateAction } from "react";

export interface VideoProps {
  created_at: string;
  description: string;
  id: string;
  num_comments: number;
  title: string;
  user_id: string;  
  video_url: string;
  avatar?: string;

}

export interface GetCommentProps {
  comments: CommentProps[];
  error: string | null;
  getComments: () => void;
  isLoading: boolean;

}

export interface PostProps {
  user_id: string;
  video_url: string;
  title: string;
  description: string;
}

export interface EditVideoProps{
  video_id: string;
  title: string;
  description: string;
}

export interface CommentProps {
  content: string;
  user_id: string;
  video_id: string;
  created_at?: string;
}

export interface NavbarProps {
  currentUser: UserProps;
  setCurrentUser: Dispatch<SetStateAction<UserProps>>;
  refreshPosts: () => void; 
}

export interface GetVideoProps {
  videoData: VideoProps[];
  error: string | null;
  isLoading: boolean;
  getVideos: () => void;  
}

export interface UserProps {
  name: string;
  avatar: string;
}


