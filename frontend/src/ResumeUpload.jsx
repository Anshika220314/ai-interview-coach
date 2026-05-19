import { useState } from 'react';
import axios from 'axios';

const ResumeUpload = ({ userId, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Only PDF files are supported.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError('');
            setMessage('');
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a valid PDF file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        setUploading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/resumes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(`Success! "${response.data.fileName}" has been safely processed.`);
            setFile(null);
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            // 🌟 SAFELY EXTRACT ERROR: Checks if backend sent back a specific string error message, otherwise prints generic error
            const backendError = typeof err.response?.data === 'string' 
                ? err.response.data 
                : (err.response?.data?.message || 'Failed to complete file pipeline ingestion.');
            setError(backendError);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 text-left">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Context Knowledge Core</h3>
                <p className="text-xs text-gray-500 mt-1">Upload your resume in PDF format to build custom AI profile tracking models.</p>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 hover:border-indigo-500 rounded-xl p-6 transition duration-200 text-center relative bg-gray-50/30">
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1.5 pointer-events-none">
                        <div className="text-gray-400 font-medium text-xs">
                            {file ? (
                                <span className="text-indigo-600 font-bold font-mono">📄 {file.name}</span>
                            ) : (
                                "Drag & drop your resume here or click to browse"
                            )}
                        </div>
                        <p className="text-[10px] text-gray-400">Supports PDF format up to 10MB</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={uploading || !file}
                    className={`w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition duration-200 ${
                        !file 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                    }`}
                >
                    {uploading ? 'Processing Document Bytes...' : 'Ingest Resume Profile'}
                </button>

                {message && <div className="p-3 bg-green-50 text-green-700 rounded-xl text-center text-xs font-medium border border-green-100">{message}</div>}
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-center text-xs font-medium border border-red-100">{error}</div>}
            </form>
        </div>
    );
};

export default ResumeUpload;