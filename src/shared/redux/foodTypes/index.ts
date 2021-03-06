import ReduxReducer from "../../types/store/reducer";
import FoodTypeProps from "../../types/FoodType";
import { findAndReplaceImmutable, findAndRemoveImmutable } from "../../utils/array";
import routines from "./routines";
import BasicReducerState from "../../types/store/state";

export interface FoodTypesState extends BasicReducerState {
	data: Array<FoodTypeProps>;
}

export const foodTypeInitialState: FoodTypesState = {
	data: [],
	processing: false,
	loaded: false,
};

const FoodTypeReducer: ReduxReducer<FoodTypesState> = (state = foodTypeInitialState, action) => {
	switch (action.type) {
		case routines.get.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.get.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		case routines.get.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.create.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.create.SUCCESS: return {
			...state,
			data: [...state.data, action.payload.data],
		};
		case routines.create.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.edit.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.edit.SUCCESS:
			return {
				...state,
				data: findAndReplaceImmutable<FoodTypeProps>(action.payload.data, state.data, el => el._id === action.payload.data._id),
			};
		case routines.edit.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.remove.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.remove.SUCCESS: return {
			...state,
			data: findAndRemoveImmutable<FoodTypeProps>(state.data, el => el._id === action.payload.data._id),
		};
		case routines.remove.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.hotReload.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		default: return state;
	}
};

export default FoodTypeReducer;