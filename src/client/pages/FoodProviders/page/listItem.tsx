import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import WithDispatch from "../../../../shared/types/store/dispatch";
import FoodProviderProps from "../../../../shared/types/FoodProvider";
import LinkedIconButton from "../../../components/Linked/LinkedIconButton/index";
import ConfirmationDialog, { ConfirmationDialogControllerProps } from "../../../components/Dialog";
import routines from "../../../../shared/redux/foodProviders/routines";

export class FoodProviderListItem extends React.PureComponent<FoodProviderProps & RouteComponentProps & WithDispatch> {
	deleteConfirmationDialogController: ConfirmationDialogControllerProps = {
		open: () => null,
		close: () => null,
	};
	delete = () => this.props.dispatch(routines.remove.trigger({ data: { _id: this.props._id } }));
	render() {
		const { _id, picture, name, foodTypes } = this.props;
		return (
			<React.Fragment>
				<ListItem>
					<ListItemAvatar>
						<Avatar src={picture} />
					</ListItemAvatar>
					<ListItemText primary={name} secondary={foodTypes.map(t => t.name).join(", ")} />
					<ListItemSecondaryAction>
						<LinkedIconButton aria-label="Edit" to={`/food-providers/${_id}`}>
							<EditIcon />
						</LinkedIconButton>
						<IconButton aria-label="Delete" onClick={() => this.deleteConfirmationDialogController.open()}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<ConfirmationDialog
					controller={this.deleteConfirmationDialogController}
					title={`Please confirm removing ${name}`}
					description={`Are you sure you want remove ${name}? You can not undo this action.`}
					onAgree={this.delete}
				/>
			</React.Fragment>
		);
	}
}

export default connect(null)(withRouter(FoodProviderListItem)) as React.ComponentType<FoodProviderProps>;