"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
);

export default function Media() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabaseService.storage.from("images").list();
      if (error) throw error;

      const imageData = await Promise.all(
        data.map(async (item) => ({
          name: item.name,
          url: supabaseService.storage
            .from("images")
            .getPublicUrl(`${item.name}`).data.publicUrl,
        }))
      );
      setImages(imageData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data, error } = await supabaseService.storage
        .from("images")
        .upload(`public/${file.name}`, file);

      if (error) throw error;

      const imageUrl = supabaseService.storage
        .from("images")
        .getPublicUrl(`public/${file.name}`).data.publicUrl;

      setImages((prev) => [...prev, { name: file.name, url: imageUrl }]);
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const confirmDelete = (imageName: string) => {
    setImageToDelete(imageName);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const { error } = await supabaseService.storage
        .from("images")
        .remove([`public/${imageToDelete}`]);
      
      if (error) throw error;

      setImages((prev) => prev.filter((img) => img.name !== imageToDelete));
      toast({
        title: "Success",
        description: "Image deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Media Gallery</h1>
        <div>
          <Button 
            variant="outline" 
            className="gap-2"
            disabled={uploading}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload Image
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.name} className="group relative overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => confirmDelete(image.name)}
                    className="bg-red-600 hover:bg-red-700 text-white gap-2"
                    size="sm"
                  >
                    <Icon icon="material-symbols:delete" className="text-xl" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
