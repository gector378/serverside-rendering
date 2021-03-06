import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MessageProps from "../../../../../../../shared/types/Message";
import { messageStyles } from "./styles";

export interface IncomeMessageItemOwnProps {
	message: MessageProps;
}

export interface IncomeMessageItemStyleProps {
	classes: {
		message: string;
		currentUserMessage: string;
		messageContainer: string;
		currentUserMessageContainer: string;
		editedText: string;
	};
}
export type IncomeMessageItemProps = IncomeMessageItemOwnProps & IncomeMessageItemStyleProps;
export class IncomeMessageItem extends React.PureComponent<IncomeMessageItemProps> {
	render() {
		const { classes: c, message: m } = this.props;
		const { author: { profile: p } } = m;
		return (
			<div className={c.message}>
				<Avatar src={p.picture || ""} />
				<div className={c.messageContainer}>
					<Typography color="textSecondary">
						{p.name}
					</Typography>
					<Typography color={m.deleted ? "textSecondary" : "textPrimary"}>
						{
							m.deleted
								? "Deleted"
								: m.text
						}
					</Typography>
					{
						!m.deleted && m.createdAt !== m.updatedAt
							? (
								<Typography color="textSecondary" className={c.editedText}>
									Edited
								</Typography>
							) : null
					}
				</div>
			</div>
		);
	}
}
export default withStyles(messageStyles)(IncomeMessageItem);