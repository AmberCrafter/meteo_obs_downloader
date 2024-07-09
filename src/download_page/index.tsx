import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../reduxStore";

import { ParameterButton } from "../components/parameter_button";
import { TimeSelector } from "../components/time_selector";
import { DownloadStage, addParameter, clearParameters, delParameter, setSite, setStage, setTimeRange } from '../reduxStore/downloaderStore';
import { useEffect, useState } from 'react';
import { add_process_step, to_process_step } from '../reduxStore/processStepStore';
import { ProcessStepBlock } from '../reduxStore/processStepStore';

import "./index.css";

const DownloadPage: () => JSX.Element
= () => {
    const dispatch = useDispatch();
    const stage = useSelector((state: RootState) => state.downloaderReducer.stage);
    // const site = useSelector((state: RootState) => state.downloaderReducer.site);
    // const starttime = useSelector((state: RootState) => state.downloaderReducer.starttime);
    // const endtime = useSelector((state: RootState) => state.downloaderReducer.endtime);
    // const parameters = useSelector((state: RootState) => state.downloaderReducer.parameter);

    const [st, setSt] = useState("");
    const [et, setEt] = useState("");
    const [para, setPara] = useState({
        name: ["Temperature", "Humidity", "Pressure", "Winddirection", "Windspeed", "Rain05", "Rain01", "SolarRadiation"],
        paraCode: [10, 11, 12, 13, 14, 15, 125, 16],
        selected: [false, false, false, false, false, false, false, false],
    });
    const [downloadValid, setDownloadValid] = useState(false);

    useEffect(
        ()=>{
            if (para.selected.find((val) => val)) {
                if (!downloadValid) {
                    let psb: ProcessStepBlock = {
                        name: "Download",
                        value: "",
                        stage: DownloadStage.Downloading,
                    };
                    dispatch(add_process_step(psb));
                    setDownloadValid(true);
                }
            } else {
                if (downloadValid) {
                    dispatch(to_process_step(DownloadStage.SelectParameter));
                    setDownloadValid(false);
                }
            }
        }, [para]
    );

    if (stage == DownloadStage.SelectSite) {
        const sites: string[] = ["NCU"];
        return (
            <div>
                {
                    sites.map((member, idx) => {
                        return <ParameterButton key={"button-site-" + idx} val={member} state={false} onclick_cb={() => {
                            let psb: ProcessStepBlock = {
                                name: "Site",
                                value: member,
                                stage: DownloadStage.SelectSite,
                                // release_callback: () => {}
                            };
                            dispatch(add_process_step(psb));
                            dispatch(setSite(member));
                            dispatch(setStage(DownloadStage.SelectTime));
                        }} disabled={false}/>
                    })
                }
            </div>
        )
    }

    if (stage == DownloadStage.SelectTime) {
        return (
            <div>
                <div className='time-select-container'>
                    <div className='time-select-key'>Starttime: </div>
                    <TimeSelector onchange_cb={(e: any) => setSt(e.target.value)} />
                </div>
                <div className='time-select-container'>
                    <div className='time-select-key'>Endtime: </div>
                    <TimeSelector onchange_cb={(e: any) => setEt(e.target.value)} />
                </div>
                <div>
                    <ParameterButton val={"Enter"} state={false} onclick_cb={() => {
                        let psb: ProcessStepBlock = {
                            name: "Time",
                            value: st + " - " + et,
                            stage: DownloadStage.SelectTime,
                            // release_callback: () => {}
                        };
                        dispatch(add_process_step(psb));
                        dispatch(setTimeRange({ starttime: st, endtime: et }));
                        dispatch(setStage(DownloadStage.SelectParameter));
                        dispatch(clearParameters(null));
                    }} disabled={false}/>
                </div>
            </div>
        )
    }

    if (stage == DownloadStage.SelectParameter) {
        return (
            <div className='parameter-button-container'>
                {
                    para.name.map((member, idx) => {
                        return <ParameterButton key={"button-site-" + idx} val={member} state={para.selected[idx]} onclick_cb={() => {
                            if (para.selected[idx]) {
                                let buf = {...para};
                                buf.selected[idx] = false;
                                setPara(buf);
                                dispatch(delParameter({para: member, paraCode: para.paraCode[idx]}));
                            } else {
                                let buf = {...para};
                                buf.selected[idx] = true;
                                setPara(buf);
                                dispatch(addParameter({para: member, paraCode: para.paraCode[idx]}));
                            }
                        }} disabled={false}/>
                    })
                }
            </div>
        )
    }

    if (stage == DownloadStage.Downloading) {
        return (
            <div className='parameter-button-container'>
                {
                    para.name.map((member, idx) => {
                        return <ParameterButton key={"button-site-" + idx} val={member} state={para.selected[idx]} onclick_cb={() => {}} disabled={true}/>
                    })
                }
            </div>
        )
    }


    return (
        <div>
            default download page
        </div>
    )
}

export default DownloadPage;