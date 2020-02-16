<?php

// use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

if (!function_exists('storePhoto')) {
    function storePhoto(array $arr, $slug, $type, $name = null)
    {
        if ($type == "foto-restoran" || $type == "menu" || $type == "meja") {
            $files = $arr['foto'];
            $i = 1;
            $image = [];
            foreach ($files as $file) {
                if ($type == "menu") {
                    $imagename = $arr['kategori_id'] . '-' . $name . '.' . $file->getClientOriginalExtension();
                } elseif ($type == "foto-restoran") {
                    $imagename = $slug . '-foto-' . $i . '.' . $file->getClientOriginalExtension();
                } elseif ($type == "meja") {
                    $imagename = $slug . '-meja_no-' . $i . '.' . $file->getClientOriginalExtension();
                }
                $file->storeAs('public/' . $slug, $imagename);
                $url = Storage::url($slug . '/' . $imagename);
                $image[] = $url;
                $i += 1;
            }
            $arr['foto'] = implode(', ', $image);
        } elseif ($type == "logo-restoran") {
            $logo = $arr['logo'];
            $logoname = $slug . '-logo.' . $logo->getClientOriginalExtension();
            $logo->storeAs('public/' . $slug, $logoname);
            $arr['logo'] = Storage::url($slug . '/' . $logoname);
        }
        return $arr;
    }
}

/**
 * Store Single or Multiple File
 * @param array $array
 * @param string $key
 * @param string $destination
 * @param string $subfolder
 * @param string $name
 * @param string $totalFile
 * @return string|array
 */

if (!function_exists('storeFile')) {
    function storeFile(array $array, string $key, string $destination, string $subfolder = null, string $name, string $totalFile)
    {
        $file = $array[$key];
        if ($totalFile == "single" || $totalFile == "Single") {
            $filename = "$name." . $file->getClientOriginalExtension();
            if (isset($subfolder)) {
                $file->storeAs('public/' . $destination . '/' . $subfolder, $filename);
                $array[$key] = Storage::url($destination . '/' . $subfolder . '/' . $filename);
            } else {
                $file->storeAs('public/' . $destination, $filename);
                $array[$key] = Storage::url($destination . '/' . $filename);
            }
        } elseif ($totalFile == "multiple" || $totalFile == "Multiple") {
            $files = [];
            $i = 1;
            foreach ($file as $f) {
                $filename = "$name-$i." . $f->getClientOriginalExtension();
                if (isset($subfolder)) {
                    $f->storeAs('public/' . $destination . '/' . $subfolder, $filename);
                    $url = Storage::url($destination . '/' . $subfolder . '/' . $filename);
                } else {
                    $f->storeAs('public/' . $destination, $filename);
                    $url = Storage::url($destination . '/' . $filename);
                }
                $files[] = $url;
                $i += 1;
            }
            $array[$key] = implode(', ', $files);
        } else {
            return "Undefined";
        }
        return $array;
    }
}
