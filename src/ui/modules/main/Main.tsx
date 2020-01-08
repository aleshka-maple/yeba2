import * as React from "react";
import {connect} from "react-redux";
import {HeartActions} from "../../heart/actions";
import {IImage} from "../../heart/reducer";
import './Main.less';
import {IReduxStore} from "../../store/reduxStore";
import {MainCustomModal} from "./modals/MainCustomModal";
import Scrollbar from "react-scrollbars-custom";

const cardWidth = 220;
const cardHeight = 140;

interface IState {
    idx: number;
    modalOpen: boolean;
    animation: boolean;
    left: number;
    top: number;
    style: string;
    index: number;
    scrollLeft: number;
}

type TProps = IStateProps & IDispatchProps;

class Main extends React.Component<TProps, IState> {

    state: IState = {
        idx: 0,
        modalOpen: false,
        animation: false,
        left: 0,
        top: 0,
        style: '',
        index: -1,
        scrollLeft: 0
    };

    modal: HTMLElement = null;

    slider = null;

    setSliderRef = (instance) => {
        console.log(instance);
        this.slider = instance;
    };


    componentDidMount () {
        /*const begin = performance.now();
        const intervalTimer = setInterval(this.handleLoad, 300);
        setTimeout(() => {
            clearInterval(intervalTimer);
        }, 1000);*/
        this.handleLoad();
    }

    refModal = (instance) => {
        this.modal = instance;
    };

    handleClick = () => {
        this.props.actions.get1();
    };

    handleLoad = () => {
        const oldIdx = this.state.idx;
        this.setState((prevState) => ({
           idx: prevState.idx + 5
        }), () => this.props.actions.loadTest(oldIdx, this.state.idx));
    };

    handleModalOpen = (e: React.SyntheticEvent, index: number) => {
        this.setState({
            modalOpen: true,
            left: e.currentTarget.getBoundingClientRect().left,
            top: e.currentTarget.getBoundingClientRect().top,
            style: '',
            index: index
        });
    };

    handleModalClose = () => {
        const {left: leftCard, top: topCard, index} = this.state;
        const {left, top, width, height} = this.modal.getBoundingClientRect();
        const leftT = leftCard - left;
        const topT = topCard - top + cardHeight;
        const scale = cardWidth/width;

        const animation = `
        @keyframes message-in-out {
            0% {transform: translate(0px, 0px); border-radius: 16px;}
            50% {transform: translate(${leftT}px, ${topT}px) scale(${scale}); opacity: 1; border-radius: ${16/scale}px;}
            85% {transform: translate(${leftT}px, ${topT - cardHeight}px) scale(${scale}); opacity: 0; border-radius: ${16/scale}px;}
            100% {transform: translate(${leftT}px, ${topT - cardHeight}px) scale(${scale}); opacity: 0; border-radius: ${16/scale}px;}
        }
        `;
        this.setState({
            style: animation
        });

        setTimeout(() => this.setState({modalOpen: false, index: -1, style: ''}), 1700);
    };

    handleClickRight = () => {
        this.setState((prevState) => ({
            ...prevState,
            scrollLeft: Math.min(prevState.scrollLeft + 100, this.slider.scrollWidth - this.slider.clientWidth)
        }))
    };

    handleClickLeft = () => {
        this.setState((prevState) => ({
            ...prevState,
            scrollLeft: Math.max(prevState.scrollLeft - 100, 0)
        }))
    };

    render () {
        const {modalOpen, style} = this.state;
        return (
            <section className="main">
                <div>
                    <button onClick={this.handleClick}>Generate</button>
                </div>
                <div>
                    {this.props.test}
                </div>

                <div>
                    <button onClick={this.handleLoad}>Load</button>

                </div>

                <div className="image-test-section-scrollbar-container">
                    <Scrollbar
                        style={{ width: '100%', height: 140}}
                        noScroll={true}
                        scrollLeft={this.state.scrollLeft}
                        ref={this.setSliderRef}
                    >
                        <div className="image-test-section">
                            {
                                this.props.data.slice(0, 20).map((item, index) => {
                                    return (
                                        <div
                                            key={item.image}
                                            className={`image-test-container ${style && index === this.state.index ? 'animated' : ''}`}
                                            onClick={(e) => this.handleModalOpen(e, index)}
                                        >
                                            <div className="back-side"/>
                                            <div className="index-label">
                                                {index}
                                            </div>
                                            {item.status && <img className="image-test" src={item.image} />}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Scrollbar>
                    <div className="left-button-container">
                        <button onClick={this.handleClickLeft}>
                            left
                        </button>
                    </div>
                    <div className="right-button-container">
                        <button onClick={this.handleClickRight}>
                            right
                        </button>
                    </div>
                </div>

                <div className="another-ipa">
                </div>

                <style>
                    {style}
                </style>
                {
                    modalOpen && (
                        <MainCustomModal
                            onClose={this.handleModalClose}
                            getRef={this.refModal}
                            className={`my-modal ${style ? 'animated' : ''}`}
                        />
                    )
                }

                {/** Other routes? */}
            </section>
        )
    }
}

interface IStateProps {
    test: number;
    data: IImage[];
}

const mapStateToProps = (state: IReduxStore): IStateProps => ({
    test: state.heart.test,
    data: state.heart.data
});

interface IDispatchProps {
    actions: HeartActions;
}

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    actions: new HeartActions(dispatch)
});

const connected = connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(Main);

export {connected as Main}
