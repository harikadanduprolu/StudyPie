import { useState } from 'react';
import { ArrowLeft, BookOpen, Target, Brain, Code, Database, Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CreateWorkspace = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    icon: 'BookOpen',
    color: 'from-violet-500 to-purple-600',
    topics: ['']
  });

  const icons = [
    { name: 'BookOpen', icon: BookOpen, label: 'Book' },
    { name: 'Target', icon: Target, label: 'Target' },
    { name: 'Brain', icon: Brain, label: 'Brain' },
    { name: 'Code', icon: Code, label: 'Code' },
    { name: 'Database', icon: Database, label: 'Database' },
    { name: 'Globe', icon: Globe, label: 'Web' }
  ];

  const colors = [
    { name: 'from-violet-500 to-purple-600', class: 'from-violet-500 to-purple-600' },
    { name: 'from-teal-500 to-cyan-600', class: 'from-teal-500 to-cyan-600' },
    { name: 'from-pink-500 to-rose-600', class: 'from-pink-500 to-rose-600' },
    { name: 'from-orange-500 to-red-600', class: 'from-orange-500 to-red-600' },
    { name: 'from-green-500 to-emerald-600', class: 'from-green-500 to-emerald-600' },
    { name: 'from-blue-500 to-indigo-600', class: 'from-blue-500 to-indigo-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement workspace creation with Supabase
    console.log('Creating workspace:', formData);
  };

  const addTopic = () => {
    setFormData(prev => ({ ...prev, topics: [...prev.topics, ''] }));
  };

  const updateTopic = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const SelectedIcon = icons.find(i => i.name === formData.icon)?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Create New Workspace</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Details</CardTitle>
                <CardDescription>Set up your new learning space</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Workspace Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Data Structures & Algorithms"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Code</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g., DSA, OS, DBMS"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of what you'll learn"
                    />
                  </div>

                  {/* Icon Selection */}
                  <div className="space-y-3">
                    <Label>Choose Icon</Label>
                    <div className="grid grid-cols-6 gap-3">
                      {icons.map((iconOption) => {
                        const IconComponent = iconOption.icon;
                        return (
                          <button
                            key={iconOption.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, icon: iconOption.name }))}
                            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                              formData.icon === iconOption.name
                                ? 'border-violet-500 bg-violet-500/10'
                                : 'border-border hover:border-violet-500/50'
                            }`}
                          >
                            <IconComponent className="w-6 h-6 mx-auto" />
                            <p className="text-xs mt-1">{iconOption.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="space-y-3">
                    <Label>Choose Color</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {colors.map((colorOption) => (
                        <button
                          key={colorOption.name}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: colorOption.name }))}
                          className={`h-12 rounded-lg bg-gradient-to-r ${colorOption.class} border-2 transition-all hover:scale-105 ${
                            formData.color === colorOption.name
                              ? 'border-white ring-2 ring-violet-500'
                              : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Topics to Cover</Label>
                      <Button type="button" onClick={addTopic} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Topic
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.topics.map((topic, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            value={topic}
                            onChange={(e) => updateTopic(index, e.target.value)}
                            placeholder={`Topic ${index + 1}`}
                          />
                          {formData.topics.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeTopic(index)}
                              size="icon"
                              variant="ghost"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                  >
                    Create Workspace
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg`}>
                  <div className={`w-12 h-12 bg-gradient-to-r ${formData.color} rounded-xl flex items-center justify-center mb-4`}>
                    <SelectedIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    {formData.title || 'Workspace Title'}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {formData.description || 'Description will appear here'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {formData.topics.filter(t => t.trim()).length} topics
                    </span>
                    <Badge variant="secondary" className="bg-violet-500/20 text-violet-300">
                      {formData.subject || 'SUBJ'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Topics Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData.topics.filter(t => t.trim()).map((topic, index) => (
                  <div key={index} className="text-sm p-2 bg-muted/50 rounded flex items-center space-x-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full" />
                    <span>{topic}</span>
                  </div>
                ))}
                {formData.topics.filter(t => t.trim()).length === 0 && (
                  <p className="text-sm text-muted-foreground">Add topics to see them here</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
