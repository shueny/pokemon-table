import {create} from 'zustand';

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonDetail {
	id: number;
	abilities: {ability: {name: string}}[];
	base_experience: number;
	name: string;
	height: number;
	weight: number;
	sprites: {front_default: string};
	types: {type: {name: string}}[];
}

interface SearchState {
	search: string;
	pokemons: Pokemon[];
	loading: boolean;
	error: string | null;
	setSearch: (search: string) => void;
	setPokemons: (pokemons: Pokemon[]) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	reset: (initialPokemons: Pokemon[]) => void;
	// Modal state
	modalOpen: boolean;
	modalData: PokemonDetail | null;
	modalTitle: string;
	modalLoading: boolean;
	setModalOpen: (open: boolean) => void;
	setModalData: (data: PokemonDetail | null) => void;
	setModalTitle: (title: string) => void;
	setModalLoading: (loading: boolean) => void;
	resetModal: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
	search: '',
	pokemons: [],
	loading: false,
	error: null,
	setSearch: (search) => set({search}),
	setPokemons: (pokemons) => set({pokemons}),
	setLoading: (loading) => set({loading}),
	setError: (error) => set({error}),
	reset: (initialPokemons) =>
		set({
			search: '',
			pokemons: initialPokemons,
			loading: false,
			error: null,
		}),
	// Modal state
	modalOpen: false,
	modalData: null,
	modalTitle: '',
	modalLoading: false,
	setModalOpen: (open) => set({modalOpen: open}),
	setModalData: (data) => set({modalData: data}),
	setModalTitle: (title) => set({modalTitle: title}),
	setModalLoading: (loading) => set({modalLoading: loading}),
	resetModal: () =>
		set({
			modalOpen: false,
			modalData: null,
			modalTitle: '',
			modalLoading: false,
		}),
}));
