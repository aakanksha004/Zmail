import React, { useEffect, useState } from 'react';
import "../DriveCss/data.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { db } from '../firebase';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useTheme } from '@mui/material/styles';

function Data() {
    const [files, setFiles] = useState([]);
    const theme = useTheme(); // Access current theme

    // Define colors based on the theme mode
    const textColor = theme.palette.mode === 'dark' ? 'white' : '#808080';
    const iconColor = theme.palette.mode === 'dark' ? 'white' : '#5f6368';
    const grayTextColor = '#808080'; // Gray color for text
    const blueColor = '#1a73e8'; // Blue color for CloudDownloadIcon

    useEffect(() => {
        db.collection("myfiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));
        });
    }, []);

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className='data'>
            <div className='data_header'>
                <div className='data_headerLeft' style={{ color: textColor }}>
                    <p>My Drive</p>
                    <ArrowDropDownIcon style={{ color: iconColor }} />
                </div>

                <div className='data_headerRight'>
                    <ListIcon style={{ color: iconColor }} />
                    <InfoOutlinedIcon style={{ color: iconColor }} />
                </div>
            </div>

            <div className='data_content'>
                <div className='data_grid'>
                    {files.map((file) => {
                        return (
                            <div className='data_file' key={file.id}>
                                <InsertDriveFileIcon style={{ color: iconColor }} />
                                <p style={{ color: grayTextColor }}>{file.data.filename}</p> {/* Set text color to gray */}
                            </div>
                        );
                    })}
                </div>

                <div className='data_list'>
                    <div className='detailsRow heading' style={{ color: textColor }}>
                        <p><b>Name <ArrowDownwardIcon style={{ color: iconColor }} /></b></p>
                        <p><b>Download</b></p>
                        <p><b>Last Modified</b></p>
                        <p><b>File Size</b></p>
                    </div>

                    {files.map((file) => {
                        return (
                            <div className='detailsRow' key={file.id} style={{ color: textColor }}>
                                <p><InsertDriveFileIcon style={{ color: iconColor }} /> {file.data.filename}</p>
                                <p>
                                    <a href={file.data.fileURL}>
                                        <CloudDownloadIcon style={{ color: blueColor }} /> {/* Set CloudDownloadIcon to blue */}
                                    </a>
                                </p>
                                <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
                                <p>{formatBytes(file.data.size)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Data;

