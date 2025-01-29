// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{generate_handler, Builder};
mod dto;                  // Define el módulo para dto.rs
mod clientes_repository;  // Define el módulo para clientes_repository.rs
mod empleados_repository; // Define el módulo para empleados_repository.rs
mod commands;             // Define el módulo para commands.rs

/// Función de ejemplo para probar Tauri
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Bienvenido a la aplicación de la galería.", name)
}

fn main() {
    println!(" ========== Tauri iniciado ==========");
    
    Builder::default()
        .invoke_handler(generate_handler![
            commands::get_all_clientes_command,
            commands::get_cliente_by_id_command,
            commands::insertar_cliente_command,
            commands::eliminar_cliente_command,
            commands::modificar_nombre_cliente_command,

            commands::insertar_empleado_command,
            commands::get_all_empleados_command,
            commands::get_empleado_by_id_command,
            commands::get_all_empleados_by_cargo_command,
            commands::get_count_empleados_command,
            commands::get_last_update_at_empleados_command,
            commands::delete_empleado_command,
            commands::update_empleado_command,
            greet,
        ])
        .run(tauri::generate_context!())
        .expect("Error al iniciar la aplicación");

    println!(" ========== Aplicación finalizada ==========");
}
