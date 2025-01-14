// src/lib/supabase-storage.ts
import { supabase } from '@/integrations/supabase/client';

export const uploadProfileImage = async (file: File, userId: string) => {
  try {
    // Create a unique file path
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/profile.${fileExt}`;

    // Upload the file to Supabase storage
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) throw error;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    // Update the profile with the new image URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};