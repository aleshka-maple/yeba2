import * as React from "react";
import {connect} from "react-redux";
import {HeartActions} from "../../heart/actions";
import {IImage} from "../../heart/reducer";
import './Main.less';

interface IState {
    idx: number;
}

type TProps = IStateProps & IDispatchProps;

class Main extends React.Component<TProps, IState> {

    state: IState = {
        idx: 0
    };

    componentDidMount () {
        /*const begin = performance.now();
        const intervalTimer = setInterval(this.handleLoad, 300);
        setTimeout(() => {
            clearInterval(intervalTimer);
        }, 1000);*/
    }

    handleClick = () => {
        this.props.actions.get1();
    };

    handleLoad = () => {
        const oldIdx = this.state.idx;
        this.setState((prevState) => ({
           idx: prevState.idx + 5
        }), () => this.props.actions.loadTest(oldIdx, this.state.idx));
    };

    render () {
        return (
            <section className="main">
                Main is here
                <div>
                    <button onClick={this.handleClick}>Generate</button>
                </div>
                <div>
                    {this.props.test}
                </div>

                <div>
                    <button onClick={this.handleLoad}>Load</button>

                </div>

                <div className="image-test-section">
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <div className="image-test-container" key={item.image}>
                                    <div className="index-label">
                                        {index}
                                    </div>
                                    {item.status && <img className="image-test" src={item.image} />}
                                </div>
                            );
                        })
                    }
                </div>

                {/** Other routes? */}
            </section>
        )
    }
}

interface IStateProps {
    test: number;
    data: IImage[];
}

const mapStateToProps = (state): IStateProps => ({
    test: state.heart.test,
    data: state.heart.data
});

interface IDispatchProps {
    actions: HeartActions;
}

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    actions: new HeartActions(dispatch)
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Main);

export {connected as Main}