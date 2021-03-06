import mongoose from "mongoose";
import { OrderFoodProviderVoteProps } from "../../shared/types/Order/OrderFoodProviderVote";
import transformMongooseErrors from "../utils/models/errors";
export type OrderFoodProviderVoteModel = mongoose.Document & OrderFoodProviderVoteProps;
const OrderFoodProviderVoteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
	},
	foodProviderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FoodProvider",
	},
	voteId: {
		type: String,
		unique: true,
	},
});
const populate = (doc: OrderFoodProviderVoteModel, next: Function) => {
	doc.populate("user").execPopulate().then(() => next());
};
OrderFoodProviderVoteSchema.pre("save", function (next) {
	const vote = this as any;
	vote.voteId = vote.user + "|" + vote.orderId + "|" + vote.foodProviderId;
	console.log(vote);
	next();
});
OrderFoodProviderVoteSchema.post("init", populate);
OrderFoodProviderVoteSchema.post("save", populate);
OrderFoodProviderVoteSchema.post("save", transformMongooseErrors("You are already voted for this provider"));

const OrderFoodProviderVote = mongoose.model("OrderFoodProviderVote", OrderFoodProviderVoteSchema);
export default OrderFoodProviderVote;