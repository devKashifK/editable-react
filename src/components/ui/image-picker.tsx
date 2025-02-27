"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "../hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
);

async function uploadImage(file: File) {
  const { data, error } = await supabaseService.storage
    .from("images")
    .upload(`${file.name}`, file);

  if (error) {
    throw new Error(error.message);
  }
  return await supabaseService.storage
    .from("images")
    .getPublicUrl(`${file.name}`).data.publicUrl;
}

async function fetchImages() {
  const { data, error } = await supabaseService.storage.from("images").list();


  if (error) {
    throw new Error(error.message);
  }

  return Promise.all(
    data.map(async (item) => ({
      name: item.name,
      url: supabaseService.storage.from("images").getPublicUrl(`${item.name}`)
        .data.publicUrl,
    }))
  );
}

export function ImageUploaderAndPicker({
  onChange,
}: {
  onChange: (image: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("uploaded");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Query for fetching images
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  });

  // Mutation for uploading images
  const uploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (imageUrl, file) => {
      queryClient.setQueryData(['images'], (old: any) => [
        { name: file.name, url: imageUrl },
        ...old,
      ]);
      setSelectedImage({ name: file.name, url: imageUrl });
      setActiveTab("uploaded");
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting images
  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: (_, deletedImageName) => {
      queryClient.setQueryData(['images'], (old: any) => 
        old.filter((image: any) => image.name !== deletedImageName)
      );
      if (selectedImage?.name === deletedImageName) {
        setSelectedImage(null);
      }
      toast({
        title: "Success",
        description: "Image deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMutation.mutate(file);
  };

  const handleImageSelect = (image: { name: string; url: string }) => {
    setSelectedImage(image);
    onChange(`"${image.name}"`);
    setDialogOpen(false);
  };

  async function deleteImage(imageName) {
    const { error } = await supabaseService.storage
      .from("images") // Replace "images" with your actual bucket name if different
      .remove([`${imageName}`]); // Use the correct folder path if you have one

    if (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="space-y-6 w-full relative z-10">
      <div className="flex w-full items-center space-x-4">
        <Input
          type="text"
          placeholder="No image selected"
          value={selectedImage ? selectedImage.name : ""}
          readOnly
          className="flex-grow"
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-2 w-40 py-1 text-content">
              Choose Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-content sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Select an Image</DialogTitle>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="uploaded">Uploaded Images</TabsTrigger>
                <TabsTrigger value="upload">Upload from Computer</TabsTrigger>
              </TabsList>
              <TabsContent value="uploaded">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="mb-4 relative">
                      <Input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                      <Icon
                        icon="mdi:magnify"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-h-[350px] pretty-scroll overflow-y-auto">
                      {filteredImages.map((image) => (
                        <Card
                          key={image.name}
                          className={`cursor-pointer hover:shadow-md transition-shadow`}
                          onClick={() => setSelectedImage(image)}
                        >
                          <CardContent className="p-0 relative">
                            <img
                              src={image.url}
                              alt={image.name}
                              className={cn(
                                "w-full h-32 object-cover rounded-md",
                                selectedImage?.url === image.url
                                  ? "border-2 border-highlight transition-all duration-300 ease-in-out"
                                  : ""
                              )}
                            />
                            {selectedImage?.url === image.url && (
                              <div className="absolute top-0 right-0 bg-black/50 w-full h-full flex items-center justify-center gap-3">
                                <div
                                  className="p-1 rounded-full hover:bg-highlight transition-colors duration-300 ease-in-out"
                                  onClick={() => handleImageSelect(image)}
                                >
                                  <Icon
                                    icon={"material-symbols:add-2"}
                                    className="text-content text-2xl"
                                  />
                                </div>
                                <div
                                  className="p-1 rounded-full hover:bg-highlight transition-colors duration-300 ease-in-out"
                                  onClick={() => deleteMutation.mutate(image.name)}
                                >
                                  <Icon
                                    icon={"material-symbols:delete"}
                                    className="text-content text-2xl"
                                  />
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="upload">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 mb-2" />
                      <span>Click to upload or drag and drop</span>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-highlight"
                onClick={() => {
                  onChange(`"${selectedImage.name}"`);
                  setDialogOpen(false);
                }}
              >
                Add Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
