use futures::executor::block_on;
mod wgpu_state;
use gltf::*;
use winit::{
    event::*,
    event_loop::{ControlFlow, EventLoop},
    window::{Window, WindowBuilder},
};

fn main() {
    let (document, buffers, images) = gltf::import("./test.glb").unwrap();
    for scene in document.scenes() {
        for node in scene.nodes() {
            println!(
                "Node #{} has {} children",
                node.index(),
                node.children().count(),
            );
        }
    }

    // env_logger::init();
    // let event_loop = EventLoop::new();
    // let window = WindowBuilder::new().build(&event_loop).unwrap();
    // let mut state = block_on(wgpu_state::State::new(&window));

    // event_loop.run(move |event, _, control_flow| match event {
    //     Event::WindowEvent {
    //         ref event,
    //         window_id,
    //     } if window_id == window.id() => {
    //         if !state.input(event) {
    //             match event {
    //                 WindowEvent::CloseRequested => *control_flow = ControlFlow::Exit,
    //                 WindowEvent::KeyboardInput { input, .. } => match input {
    //                     KeyboardInput {
    //                         state: ElementState::Pressed,
    //                         virtual_keycode: Some(VirtualKeyCode::Escape),
    //                         ..
    //                     } => *control_flow = ControlFlow::Exit,
    //                     _ => {}
    //                 },
    //                 WindowEvent::Resized(physical_size) => {
    //                     state.resize(*physical_size);
    //                 }
    //                 WindowEvent::ScaleFactorChanged { new_inner_size, .. } => {
    //                     state.resize(**new_inner_size);
    //                 }
    //                 _ => {}
    //             }
    //         }
    //     }
    //     Event::RedrawRequested(_) => {
    //         state.update();
    //         match state.render() {
    //             Ok(_) => {}
    //             Err(wgpu::SwapChainError::Lost) => state.resize(state.size),
    //             Err(wgpu::SwapChainError::OutOfMemory) => *control_flow = ControlFlow::Exit,
    //             Err(e) => eprintln!("{:?}", e),
    //         }
    //     }
    //     Event::MainEventsCleared => {
    //         window.request_redraw();
    //     }
    //     _ => {}
    // });
}
