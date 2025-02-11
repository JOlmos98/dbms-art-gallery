// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{generate_handler, Builder};
mod dto;                  // Define el módulo para dto.rs
mod artistas_repository;  // Define el módulo para artistas_repository.rs
mod clientes_repository;  // Define el módulo para clientes_repository.rs
mod empleados_repository; // Define el módulo para empleados_repository.rs
mod obras_repository;
mod ventas_repository;
mod detalles_ventas_repository;
mod commands;             // Define el módulo para commands.rs
mod init_db;

/// Función de ejemplo para probar Tauri
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Bienvenido a la aplicación de la galería.", name)
}

fn main() {
    println!(" ========== App de Tauri iniciada ==========");
    match init_db::init_db() {
        Ok(_) => println!("Base de datos inicializada correctamente."),
        Err(e) => eprintln!("Error al inicializar la base de datos: {}", e),
    }
    
    Builder::default()
        .invoke_handler(generate_handler![
            commands::insert_cliente_command,
            commands::get_all_clientes_command,
            commands::get_cliente_by_id_command,
            commands::get_count_clientes_command,
            commands::get_last_update_at_clientes_command,
            commands::delete_cliente_command,
            commands::update_cliente_command,
            
            commands::insertar_empleado_command,
            commands::get_all_empleados_command,
            commands::get_empleado_by_id_command,
            commands::get_all_empleados_by_cargo_command,
            commands::get_count_empleados_command,
            commands::get_last_update_at_empleados_command,
            commands::delete_empleado_command,
            commands::update_empleado_command,

            commands::insertar_artista_command,
            commands::get_all_artistas_command,
            commands::get_artista_by_id_command,
            commands::get_all_artistas_by_pais_command,
            commands::get_count_artistas_command,
            commands::get_last_update_at_artistas_command,
            commands::delete_artista_command,
            commands::update_artista_command,

            commands::insert_obra_command,
            commands::get_all_obras_command,
            commands::get_obra_by_id_command,
            commands::get_all_obras_by_tipo_command,
            commands::get_count_obras_command,
            commands::get_last_update_at_obras_command,
            commands::delete_obra_command,
            commands::update_obra_command,

            commands::insert_venta_command,
            commands::get_all_ventas_command,
            commands::get_venta_by_id_command,
            commands::get_ventas_by_cliente_command,
            commands::get_count_ventas_command,
            commands::get_last_update_at_ventas_command,
            commands::delete_venta_command,
            commands::update_venta_command,

            commands::insert_detalle_venta_command,
            commands::get_all_detalles_ventas_command,
            commands::get_detalles_by_venta_command,
            commands::get_detalles_by_obra_command,
            commands::get_count_detalles_ventas_command,
            commands::delete_detalle_venta_command,

            greet,
        ])
        .run(tauri::generate_context!())
        .expect("Error al iniciar la aplicación");

    println!(" ========== Aplicación finalizada ==========");
}
