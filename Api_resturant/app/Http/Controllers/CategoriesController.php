<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator; 

class CategoriesController extends Controller
{
    
    public function getAllCategories()
    {
        $categories = Category::all();
        if ($categories->isEmpty()) {
            return response()->json(['message' => 'No categories found'], 404);//status
        }
        
        return response()->json(['data' => $categories, 'status' => 200], 200);
    }

    public function getCategoryById($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json(['data' => $category, 'status' => 200], 200);
    }

    public function addNewCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            //'image' => 'nullable|sometimes|string', // For Base64-encoded image
            //'image_file' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // For image file
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        if (Category::where('name', $request->name)->exists()) {
            return response()->json(['message' => 'Category already exists'], 409);
        }

        $data = $request->only('name', 'description');

        // Handle Base64-encoded image
        if ($request->has('image')) {
            $imageData = $request->input('image');

            // Check if the image is Base64-encoded
            if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                $imageData = substr($imageData, strpos($imageData, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif, etc.

                $imageData = base64_decode($imageData);

                // Generate a unique filename
                $fileName = uniqid() . '.' . $type;

                // Save the image to storage
                Storage::disk('public')->put("images/{$fileName}", $imageData);

                // Set the new image path
                $data['image'] = "images/{$fileName}";
            } else {
                return response()->json(['message' => 'Invalid image data', 'status' => 400], 400);
            }
        }

        // Handle image file from form data
        if ($request->hasFile('image_file')) {
            $data['image'] = $request->file('image_file')->store('images', 'public');
        }

        $newCategory = Category::create($data);
        return response()->json(['data' => $newCategory, 'status' => 201], 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'status' => 400], 400);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found', 'status' => 404], 404);
        
        }

        $data = $request->only('name', 'description');

        if ($request->has('image')) {
            $imageData = $request->get('image');

            // Extract the base64 part from the data URL if necessary
            if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                $imageData = substr($imageData, strpos($imageData, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif, etc.

                $imageData = base64_decode($imageData);

                // Generate a unique filename
                $fileName = uniqid() . '.' . $type;

                // Save the image to storage
                Storage::disk('public')->put("images/{$fileName}", $imageData);

                // Delete the old image if it exists
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }

                // Set the new image path
                $data['image'] = "images/{$fileName}";
            } else {
                return response()->json(['message' => 'Invalid image data', 'status' => 400], 400);
            }
        }

        $category->update($data);
        return response()->json(['data' => $category, 'status' => 200], 200);
    }
    public function deleteCategory($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found', 'status' => 404], 404);
        }

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully', 'status' => 200], 200);
    }
}
