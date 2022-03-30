import { Module } from 'vuex';
import { StoreState } from '@/store';

interface Position {
  id: number;
  name: string;
}

export interface FetchPositions {
  success: boolean;
  positions: Position[];
}

export interface FetchToken {
  success: boolean;
  token: string;
}

export interface InfoState {
  positions: Position[];
}

export type InfoModule = Module<InfoState, StoreState>;
