import { useState, useRef } from 'react';
import { ArrowLeft, Upload as UploadIcon, FileText, Video, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    // TODO: Implement file upload with Supabase
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setUploading(false);
    setUploadProgress(0);
    setFiles([]);
    console.log('Files uploaded:', files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return FileText;
    if (file.type.includes('video')) return Video;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Upload Files</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Study Materials</CardTitle>
                <CardDescription>Upload PDFs, videos, and other learning resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-violet-500/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                  <p className="text-muted-foreground mb-4">
                    Support for PDF documents and video files
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.mp4,.mov,.avi,.mkv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {uploading && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Uploading...</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={uploadProgress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {uploadProgress}% complete
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* File List */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Selected Files ({files.length})</CardTitle>
                  {files.length > 0 && (
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                    >
                      {uploading ? (
                        <>Uploading...</>
                      ) : (
                        <>
                          <UploadIcon className="w-4 h-4 mr-2" />
                          Upload All
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No files selected</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {files.map((file, index) => {
                      const FileIcon = getFileIcon(file);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <FileIcon className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{formatFileSize(file.size)}</span>
                              <Badge variant="secondary" className="text-xs">
                                {file.type.includes('pdf') ? 'PDF' : 'Video'}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">PDF files will be automatically processed for text extraction</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">Video files support automatic transcription</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">Maximum file size: 100MB per file</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-sm">All content is automatically organized by AI</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
