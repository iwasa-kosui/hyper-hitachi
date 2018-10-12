import React, { Component } from 'react'
import ReactPlayer from 'react-player'

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
}

exports.decorateTerm = (Term) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isPlaying: true,
                isMuted: false,
                opacity: 0.8
            }
        }

        handleOpacityRangeChange = (e) => {
            this.setState({ opacity: e.target.value / 100 })
        }

        render() {
            const { opacity } = this.state

            return (
                <div style={{ height: "100vh" }}>
                    <ReactPlayer
                        url="https://www.youtube.com/embed/XJKCZMwo8Hw"
                        playing={this.state.isPlaying}
                        loop
                        muted={this.state.isMuted}
                        width="100vw"
                        height="100vh"
                        style={styles.ReactPlayer} />
                    <div style={{
                        background: `rgba(0, 0, 0, ${opacity})`,
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                    }}>
                        <div style={{ height: "calc(100% - 10px)" }}>
                            <Term {...this.props} />
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        padding: "0 0 2px 10px",
                    }}>
                        {
                            this.state.isMuted ? (
                                <div className='hyper-youtube-panel-button' onClick={() => { this.setState({ isMuted: false }) }}>
                                    <VolumeUp style={styles.Icon} />
                                </div>
                            ) : (
                                    <div className='hyper-youtube-panel-button' onClick={() => { this.setState({ isMuted: true }) }}>
                                        <VolumeMute style={styles.Icon} />
                                    </div>
                                )
                        }
                        {
                            this.state.isPlaying ? (
                                <div className='hyper-youtube-panel-button' onClick={() => { this.setState({ isPlaying: false }) }}>
                                    <Pause style={styles.Icon} />
                                </div>
                            ) : (
                                    <div className='hyper-youtube-panel-button' onClick={() => { this.setState({ isPlaying: true }) }}>
                                        <PlayArrow style={styles.Icon} />
                                    </div>
                                )
                        }
                        <input
                            type="range"
                            onChange={this.handleOpacityRangeChange}
                            value={this.state.opacity * 100} />
                    </div>
                </div>
            )
        }
    }
}

exports.decorateConfig = config => {
    config.backgroundColor = "transparent";
    // config.foregroundColor = 'transparent';

    return Object.assign({}, config, {});
}