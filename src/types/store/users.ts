import { Module } from 'vuex';
import { StoreState } from '@/store';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface FetchUser {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: number;
    photo: string;
  };
}

export interface FetchUsers {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string;
    prev_url: string;
  };
  users: User[];
}

export interface FetchRegisterUser {
  success: boolean;
  message: string;
  user_id?: number;
  fails?: {
    name: string[];
    email: string[];
    phone: string[];
    position_id: string[];
    photo: string[];
  }[];
}

export interface RegisterUser {
  name: string;
  phone: string;
  email: string;
  position_id: string;
  photo: File | undefined;
}

interface UsersState {
  users: User[];
  page: number;
}

export type UsersModule = Module<UsersState, StoreState>;
