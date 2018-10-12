import React, { Component } from 'react'
import { createStore } from 'redux'
import ReactPlayer from 'react-player'
import * as Color from 'color'

import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeMute from '@material-ui/icons/VolumeMute'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'

const defaultStates = {
    isMuted: false,
    isPlaying: true,
    opacity: 0.8,
    url: "https://www.youtube.com/embed/XJKCZMwo8Hw",
}

const styles = {
    ReactPlayer: {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        overflow: "hidden",
    },
    Icon: {
        width: "20px",
        height: "20px",
    },
    Panel: {
        display: "flex",
        position: "absolute",
        bottom: "0",
        left: "0",
        padding: "0 0 2px 10px",
        width: "100%",
        alignItems: "center",
    },
    PanelComponent: {
        marginRight: "12px",
        border: "1px #fff solid",
        borderRadius: "3px",
        cursor: "pointer",
    },
    OpacityText: {
        paddingRight: "3px",
        paddingBottom: "3px",
    },
    TermContainer: {
        height: "100vh"
    },
    TermWrapper: {
        height: "calc(100% - 50px)",
    }
}

exports.reduceUI = (state, action) => {
    switch (action.type) {
        case 'CHANGE_OPACITY':
            const { opacity } = action
            return state.set('hitachiState', Object.assign(
                {},
                state.hitachiState,
                { opacity }
            ))
        case 'CHANGE_URL':
            const { url } = action
            return state.set('hitachiState', Object.assign(
                {},
                state.hitachiState,
                { url }
            ))
        case 'CHANGE_IS_PLAYING':
            const { isPlaying } = action
            return state.set('hitachiState', Object.assign(
                {},
                state.hitachiState,
                { isPlaying }
            ))
        case 'CHANGE_IS_MUTED':
            const { isMuted } = action
            return state.set('hitachiState', Object.assign(
                {},
                state.hitachiState,
                { isMuted }
            ))
        default:
            return state
    }
}

const mapPropsToState = (state, map) => (
    Object.assign(map, {
        hitachiState: state.ui.hitachiState || {
            ...defaultStates
        },
    })
)

exports.mapTermsState = mapPropsToState
exports.mapHyperState = mapPropsToState

exports.decorateHyper = (Hyper) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            const config = window.config.getConfig()

            if (config.hitachi && config.hitachi.opacity) {
                window.store.dispatch({
                    type: 'CHANGE_OPACITY',
                    opacity: config.hitachi.opacity,
                })
            }

            if (config.hitachi && config.hitachi.url) {
                window.store.dispatch({
                    type: 'CHANGE_URL',
                    url: config.hitachi.url,
                })
            }
        }

        render() {
            const { hitachiState: {
                isMuted = defaultStates.isMuted,
                isPlaying = defaultStates.isPlaying,
                opacity = defaultStates.opacity,
                url = defaultStates.url,
            } } = this.props
            return (
                <div>
                    <ReactPlayer
                        url={url}
                        loop
                        playing={isPlaying}
                        muted={isMuted}
                        width="100vw"
                        height="100vh"
                        style={
                            Object.assign({}, styles.ReactPlayer, {
                                opacity
                            })
                        } />
                    <Hyper {...this.props} />
                </div>
            )
        }
    }
}

exports.decorateTerm = (Term) => {
    return class extends React.Component {
        changeIsPlaying = (isPlaying) => {
            window.store.dispatch({
                type: 'CHANGE_IS_PLAYING',
                isPlaying: isPlaying,
            })
        }

        changeIsMuted = (isMuted) => {
            window.store.dispatch({
                type: 'CHANGE_IS_MUTED',
                isMuted: isMuted,
            })
        }

        handleOpacityRangeChange = (e) => {
            window.store.dispatch({
                type: 'CHANGE_OPACITY',
                opacity: e.target.value / 100,
            })
        }

        render() {
            const { hitachiState: {
                isMuted = defaultStates.isMuted,
                isPlaying = defaultStates.isPlaying,
                opacity = defaultStates.opacity,
                url = defaultStates.url,
            } } = this.props

            return (
                <div style={styles.TermContainer}>
                    <div style={styles.TermWrapper}>
                        <Term {...this.props} opacity={opacity} />
                    </div>
                    <div style={styles.Panel}>

                        <div
                            style={styles.PanelComponent}
                            onClick={() => {
                                this.changeIsMuted(!isMuted)
                            }}
                        >
                            {isMuted ? <VolumeUp style={styles.Icon} /> : <VolumeMute style={styles.Icon} />}
                        </div>
                        <div
                            style={styles.PanelComponent}
                            onClick={() => {
                                this.changeIsPlaying(!isPlaying)
                            }}
                        >
                            {isPlaying ? <Pause style={styles.Icon} /> : <PlayArrow style={styles.Icon} />}
                        </div>
                        <span style={styles.OpacityText}>
                            Opacity
                        </span>
                        <input
                            type="range"
                            onChange={this.handleOpacityRangeChange}
                            value={opacity * 100} />
                    </div>
                    <style jsx>{`
                        input[type="range"] {
                            -webkit-appearance: none;
                            appearance: none;
                            background-color: #fff;
                            height: 2px;
                            width: 200px;
                            border-radius: 6px;
                        }

                        input[type="range"]:focus,
                        input[type="range"]:active {
                            outline: none;
                        }

                        input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            cursor: pointer;
                            position: relative;
                            width: 20px;
                            height: 20px;
                            display: block;
                            border: 2px solid #fff;
                            background-color: #fff;
                            border-radius: 50%;
                            -webkit-border-radius: 50%;
                        }

                    `}</style>
                </div>
            )
        }
    }
}

const passProps = (uid, parentProps, props) => {
    return Object.assign(props, {
        backgroundColor: 'transparent',
        hitachiState: parentProps.hitachiState,
    })
}

exports.getTermGroupProps = passProps
exports.getTermProps = passProps