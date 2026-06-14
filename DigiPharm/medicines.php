<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 

// Database array objek obat - LENGKAP 12 ITEM sesuai file catalog.html asli milikmu
$medicines = [
    ["id" => "paracetamol", "name" => "Paracetamol", "dose" => "500mg", "price" => "10.000"],
    ["id" => "ibuprofen", "name" => "Ibuprofen", "dose" => "400mg", "price" => "15.000"],
    ["id" => "mefenamic", "name" => "Mefenamic Acid", "dose" => "500mg", "price" => "12.000"],
    ["id" => "cetirizine", "name" => "Cetirizine", "dose" => "10mg", "price" => "20.000"],
    ["id" => "guaifenesin", "name" => "Guaifenesin", "dose" => "100mg", "price" => "8.000"],
    ["id" => "dextro", "name" => "Dextromethorphan", "dose" => "15mg", "price" => "10.000"],
    ["id" => "amoxicillin", "name" => "Amoxicillin", "dose" => "500mg", "price" => "25.000"],
    ["id" => "vitaminc", "name" => "Vitamin C", "dose" => "500mg", "price" => "30.000"],
    ["id" => "loratadine", "name" => "Loratadine", "dose" => "10mg", "price" => "18.000"],
    ["id" => "omeprazole", "name" => "Omeprazole", "dose" => "20mg", "price" => "22.000"],
    ["id" => "promag", "name" => "Promag", "dose" => "Tablet", "price" => "8.000"],
    ["id" => "panadolextra", "name" => "Panadol Extra", "dose" => "Blister", "price" => "12.000"]
];

echo json_encode($medicines);
?>