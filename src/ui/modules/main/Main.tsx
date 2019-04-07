import * as React from "react";
import {connect} from "react-redux";
import {HeartActions} from "../../heart/actions";

type TProps = IStateProps & IDispatchProps;

class Main extends React.Component<TProps> {

    handleClick = () => {
        this.props.actions.get1();
    };

    render () {
        return (
            <section>
                Main is here
                <div>
                    <button onClick={this.handleClick}>Generate</button>
                </div>
                <div>
                    {this.props.test}

                </div>

                {/** Other routes? */}
            </section>
        )
    }
}

interface IStateProps {
    test: number;
}

const mapStateToProps = (state): IStateProps => ({
    test: state.heart.test
});

interface IDispatchProps {
    actions: HeartActions;
}

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    actions: new HeartActions(dispatch)
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Main);

export {connected as Main}