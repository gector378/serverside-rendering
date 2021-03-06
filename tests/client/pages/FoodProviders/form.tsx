import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import { ReduxStoreState } from "../../../../src/shared/types/store/RootReducer";
import configureStore from "../../../../src/shared/redux/configureStore";
import { get as getFoodTypes } from "../../../../src/shared/redux/foodTypes/routines";
import { create, edit } from "../../../../src/shared/redux/foodProviders/routines";
import SubmitButton from "../../../../src/client/components/Form/SubmitButton";
import fakeFoodProvider from "../../../../fakes/foodProvider";
import FormPage from "../../../../src/client/components/Layout/FormPage";
import CreatePage from "../../../../src/client/pages/FoodProviders/form/create";
import {
	EditFoodProviderPage,
	mapStateToProps as editPageStateMapper,
} from "../../../../src/client/pages/FoodProviders/form/edit";
import { FoodProviderForm, FoodProviderFormProps } from "../../../../src/client/pages/FoodProviders/form/form";
describe("/client/client/pages/FoodProviders/form", () => {
	let form: ShallowWrapper<FoodProviderFormProps, {}, FoodProviderForm>;
	let formMockedProps = {
		dispatch: sinon.spy(),
		foodTypes: {
			data: [],
			processing: false,
			loaded: false,
		},
		initialValues: {},
		history: {
			push: sinon.spy(),
		},
		handleSubmit: sinon.spy(),
	};
	it("create page", () => {
		const c = shallow(<CreatePage />);
		expect(c.is(FormPage));
	});

	it("edit page", () => {
		let c = shallow(<EditFoodProviderPage />);
		expect(c.is(FormPage));
		c = shallow(<EditFoodProviderPage foodProvider={fakeFoodProvider} />);
		expect(c.is(FormPage));
	});

	it("should map props correctly", () => {
		const init: Partial<ReduxStoreState> = {
			foodProviders: {
				data: [fakeFoodProvider],
				loaded: true,
				processing: false,
			},
		};
		const state = configureStore(init).getState();
		const mapped = editPageStateMapper(state, { match: { params: { id: fakeFoodProvider._id } } } as any);
		expect(mapped.foodProvider).toEqual(fakeFoodProvider);
	});
	it("should render creation form", () => {
		form = shallow(<FoodProviderForm {...formMockedProps as any} />);
		expect(form.find(SubmitButton).prop("text")).toBe("Create");
		expect(formMockedProps.dispatch.calledOnceWith(getFoodTypes.trigger()));
	});
	it("should create on submit", (done) => {
		formMockedProps.dispatch.resetHistory();
		formMockedProps.history.push.resetHistory();
		const foodProvider = {
			name: "fake",
			foodTypes: [],
		};
		form.instance().onSubmit(foodProvider);
		expect(formMockedProps.dispatch.calledOnce).toBe(true);
		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(create.TRIGGER);
		expect(args.payload.data).toBe(foodProvider);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(formMockedProps.history.push.calledOnceWith("/food-providers")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});

	it("should render edition form", () => {
		(formMockedProps.initialValues as any)._id = "fake";
		form = shallow(<FoodProviderForm {...formMockedProps as any} />);
		expect(form.find(SubmitButton).prop("text")).toBe("Save");
		expect(formMockedProps.dispatch.calledOnceWith(getFoodTypes.trigger()));
	});
	it("should edit on submit", (done) => {
		formMockedProps.dispatch.resetHistory();
		formMockedProps.history.push.resetHistory();
		const foodProvider = {
			_id: "fake",
			name: "fake",
			foodTypes: [],
		};
		form.instance().onSubmit(foodProvider);
		expect(formMockedProps.dispatch.calledOnce).toBe(true);
		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(edit.TRIGGER);
		expect(args.payload.data).toBe(foodProvider);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(formMockedProps.history.push.calledOnceWith("/food-providers")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});
});