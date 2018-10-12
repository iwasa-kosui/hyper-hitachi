import React, { Component } from 'react'
import { createStore } from 'redux'
import ReactPlayer from 'react-player'
import * as Color from 'color'

import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeMute from '@material-ui/icons/VolumeMute'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'

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
    PanelComponents: {
        marginRight: "12px",
        border: "1px #fff solid",
        borderRadius: "3px",
        cursor: "pointer",
    },
}

exports.reduceUI = (state, action) => {
    switch (action.type) {
        case 'CHANGE_OPACITY':
            const { opacity } = action
            return state.set('hitachiState', { opacity })
        default:
            return state
    }
}

exports.mapTermsState = (state, map) => {
    return Object.assign(map, {
        hitachiState: state.ui.hitachiState,
    })
}

exports.decorateTerm = (Term) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            const config = window.config.getConfig()
            let state = {
                isPlaying: true,
                isMuted: false,
                opacity: 0.8,
                url: "https://www.youtube.com/embed/XJKCZMwo8Hw",
            }

            if (config.hitachi && config.hitachi.opacity) {
                state = Object.assign({}, state, {
                    opacity: config.hitachi.opacity
                })
            }

            if (config.hitachi && config.hitachi.url) {
                state = Object.assign({}, state, {
                    url: config.hitachi.url
                })
            }

            this.state = state

            window.store.dispatch({
                type: 'CHANGE_OPACITY',
                opacity: this.state.opacity,
            })
        }

        handleOpacityRangeChange = (e) => {
            this.setState({ opacity: e.target.value / 100 })
            window.store.dispatch({
                type: 'CHANGE_OPACITY',
                opacity: e.target.value / 100,
            })
        }

        render() {
            const { opacity, url } = this.state

            return (
                <div style={{ height: "100vh" }}>
                    <ReactPlayer
                        url={url}
                        playing={this.state.isPlaying}
                        loop
                        muted={this.state.isMuted}
                        width="100vw"
                        height="100vh"
                        style={
                            Object.assign({}, styles.ReactPlayer, {
                                opacity
                            })
                        } />
                    <div style={{ height: "calc(100% - 50px)" }}>
                        <Term {...this.props} opacity={opacity} />
                    </div>
                    <div style={styles.Panel}>
                        {
                            this.state.isMuted ? (
                                <div
                                    style={styles.PanelComponents}
                                    onClick={() => { this.setState({ isMuted: false }) }}
                                >
                                    <VolumeUp style={styles.Icon} />
                                </div>
                            ) : (
                                    <div
                                        style={styles.PanelComponents}
                                        onClick={() => { this.setState({ isMuted: true }) }}
                                    >
                                        <VolumeMute style={styles.Icon} />
                                    </div>
                                )
                        }
                        {
                            this.state.isPlaying ? (
                                <div
                                    style={styles.PanelComponents}
                                    onClick={() => { this.setState({ isPlaying: false }) }}
                                >
                                    <Pause style={styles.Icon} />
                                </div>
                            ) : (
                                    <div
                                        style={styles.PanelComponents}
                                        onClick={() => { this.setState({ isPlaying: true }) }}
                                    >
                                        <PlayArrow style={styles.Icon} />
                                    </div>
                                )
                        }
                        <span style={{
                            paddingRight: "3px",
                            paddingBottom: "3px",
                        }}>
                            Opacity
                        </span>
                        <input
                            type="range"
                            onChange={this.handleOpacityRangeChange}
                            value={this.state.opacity * 100} />
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
    })
}

exports.getTermGroupProps = passProps
exports.getTermProps = passProps