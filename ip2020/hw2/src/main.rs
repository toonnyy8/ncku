use std::string;

use iced::{
    button, image, slider, Align, Button, Column, Container, Element, Image, Length, Row, Sandbox,
    Settings, Slider, Text,
};
extern crate tch;

pub fn main() -> iced::Result {
    Counter::run(Settings::default())
}
mod style {
    use iced::{button, Background, Color, Row, Vector};

    pub enum Button {
        Primary,
        Secondary,
    }

    impl button::StyleSheet for Button {
        fn active(&self) -> button::Style {
            button::Style {
                background: Some(Background::Color(match self {
                    Button::Primary => Color::from_rgb(0.11, 0.42, 0.87),
                    Button::Secondary => Color::from_rgb(0.5, 0.5, 0.5),
                })),
                border_radius: 5.0,
                shadow_offset: Vector::new(1.0, 1.0),
                text_color: Color::from_rgb8(0xEE, 0xEE, 0xEE),
                ..button::Style::default()
            }
        }

        fn hovered(&self) -> button::Style {
            button::Style {
                text_color: Color::WHITE,
                shadow_offset: Vector::new(1.0, 2.0),
                ..self.active()
            }
        }
    }
}
// #[derive(Default)]
struct Counter {
    value: i32,
    dir_idx: usize,
    dir_names: Vec<String>,
    file_idx: usize,
    file_num: usize,
    increment_button: button::State,
    decrement_button: button::State,
    segmentation_button: button::State,
    slider: slider::State,
    model: tch::CModule,
    label: tch::Tensor,
    inp: tch::Tensor,
    segment: bool,
}

#[derive(Debug, Clone, Copy)]
enum Message {
    IncrementPressed,
    DecrementPressed,
    SegmentationPressed,
    TestMsg(i32),
}

fn load_img_tensor(path: std::string::String) -> tch::Tensor {
    let t2 = tch::vision::image::load(path);
    let t2 = match t2 {
        Ok(t2) => t2.slice(0, 0, 1, 1),
        Err(_) => tch::Tensor::zeros(&[1, 256, 256], (tch::Kind::Int64, tch::Device::Cpu)),
    };
    t2
}

impl Sandbox for Counter {
    type Message = Message;

    fn new() -> Self {
        let dir_paths = std::fs::read_dir("./carpalTunnel/").unwrap();
        let mut dir_names = Vec::new();
        for path in dir_paths {
            dir_names.push(format!("{}", path.unwrap().path().display()));
        }
        let file_paths = std::fs::read_dir(format!("{}/T1", dir_names[0])).unwrap();
        let mut file_num = 0;
        for path in file_paths {
            file_num += 1
        }
        let model = tch::CModule::load("./traced_netModel.pt");
        let model = match model {
            Ok(model) => model,
            Err(e) => panic!("error: {:?}", e),
        };
        Counter {
            value: 0,
            dir_idx: 0,
            dir_names: dir_names,
            file_idx: 0,
            file_num: file_num,
            increment_button: button::State::new(),
            decrement_button: button::State::new(),
            segmentation_button: button::State::new(),
            slider: slider::State::new(),
            model: model,
            label: tch::Tensor::zeros(&[0], (tch::Kind::Float, tch::Device::Cpu)),
            inp: tch::Tensor::zeros(&[0], (tch::Kind::Float, tch::Device::Cpu)),
            segment: false,
        }
    }

    fn title(&self) -> String {
        String::from("Counter - Iced")
    }

    fn update(&mut self, message: Message) {
        match message {
            Message::IncrementPressed => {
                if self.dir_idx < self.dir_names.len() - 1 {
                    self.dir_idx += 1;
                    self.file_idx = 0;

                    self.file_num = 0;
                    for _ in
                        std::fs::read_dir(format!("{}/T1", self.dir_names[self.dir_idx])).unwrap()
                    {
                        self.file_num += 1
                    }
                }
            }
            Message::DecrementPressed => {
                if self.dir_idx > 0 {
                    self.dir_idx -= 1;
                    self.file_idx = 0;

                    self.file_num = 0;
                    for _ in
                        std::fs::read_dir(format!("{}/T1", self.dir_names[self.dir_idx])).unwrap()
                    {
                        self.file_num += 1
                    }
                }
            }
            Message::SegmentationPressed => {
                self.segment = true;
            }
            Message::TestMsg(idx) => {
                self.file_idx = idx as usize;
            }
        }
    }

    fn view(&mut self) -> Element<Message> {
        let mut ctrl = Row::new();
        ctrl = ctrl
            .push(
                Button::new(&mut self.decrement_button, Text::new("-"))
                    .on_press(Message::DecrementPressed)
                    .style(style::Button::Secondary),
            )
            .push(
                Button::new(&mut self.increment_button, Text::new("+"))
                    .on_press(Message::IncrementPressed)
                    .style(style::Button::Primary),
            );

        let mut alpha = tch::Tensor::ones(&[1, 256, 256], (tch::Kind::Float, tch::Device::Cpu));
        let alpha = tch::Tensor::fill_(&mut alpha, 255);

        let t1 = load_img_tensor(format!(
            "{}/T1/{}.jpg",
            self.dir_names[self.dir_idx], self.file_idx,
        ));
        let t1 = t1.slice(1, 128, 384, 1);
        let t1 = t1.slice(2, 128, 384, 1);
        let t2 = load_img_tensor(format!(
            "{}/T2/{}.jpg",
            self.dir_names[self.dir_idx], self.file_idx,
        ));
        let t2 = t2.slice(1, 128, 384, 1);
        let t2 = t2.slice(2, 128, 384, 1);
        self.inp = tch::Tensor::cat(&[t1.copy(), t2.copy()], 0) / 255;

        let ct = load_img_tensor(format!(
            "{}/CT/{}.jpg",
            self.dir_names[self.dir_idx], self.file_idx,
        ));
        let ct = ct.slice(1, 128, 384, 1);
        let ct = ct.slice(2, 128, 384, 1);
        let ft = load_img_tensor(format!(
            "{}/FT/{}.jpg",
            self.dir_names[self.dir_idx], self.file_idx,
        ));
        let ft = ft.slice(1, 128, 384, 1);
        let ft = ft.slice(2, 128, 384, 1);
        let mn = load_img_tensor(format!(
            "{}/MN/{}.jpg",
            self.dir_names[self.dir_idx], self.file_idx,
        ));
        let mn = mn.slice(1, 128, 384, 1);
        let mn = mn.slice(2, 128, 384, 1);
        self.label = tch::Tensor::cat(&[ct.copy(), ft.copy(), mn.copy()], 0) / 255;
        let label_mask = self.label.copy() * 0.5;

        let label_t1_img: tch::Tensor =
            t1.repeat(&[3, 1, 1]) * (1 - label_mask.copy()) + label_mask.copy() * 255;
        let label_t1_img = label_t1_img.round();
        let label_t1_img = tch::Tensor::cat(&[label_t1_img.copy(), alpha.copy()], 0);
        let label_t1_img: tch::Tensor = label_t1_img.to_kind(tch::Kind::Uint8);
        let label_t1_img = label_t1_img.movedim(&[0], &[2]);
        let label_t1_imgh = image::Handle::from_pixels(256, 256, Vec::<u8>::from(&label_t1_img));

        let label_t2_img: tch::Tensor =
            t2.repeat(&[3, 1, 1]) * (1 - label_mask.copy()) + label_mask.copy() * 255;
        let label_t2_img = label_t2_img.round();
        let label_t2_img = tch::Tensor::cat(&[label_t2_img.copy(), alpha.copy()], 0);
        let label_t2_img: tch::Tensor = label_t2_img.to_kind(tch::Kind::Uint8);
        let label_t2_img = label_t2_img.movedim(&[0], &[2]);
        let label_t2_imgh = image::Handle::from_pixels(256, 256, Vec::<u8>::from(&label_t2_img));

        let label_img_container = Column::new()
            .push(
                Container::new(Image::new(label_t1_imgh))
                    .width(Length::Units(256))
                    .center_x(),
            )
            .push(
                Container::new(Image::new(label_t2_imgh))
                    .width(Length::Units(256))
                    .center_x(),
            );

        let pred_img_container = if self.segment {
            self.segment = false;
            let pred = self.model.forward_ts(&[self.inp.unsqueeze(0)]);
            let pred = match pred {
                Ok(pred) => pred.squeeze().round(),
                Err(e) => panic!("error: {:?}", e),
            };
            let pred_mask = pred.copy() * 0.5;

            let pred_t1_img: tch::Tensor =
                t1.repeat(&[3, 1, 1]) * (1 - pred_mask.copy()) + pred_mask.copy() * 255;
            let pred_t1_img = pred_t1_img.round();
            let pred_t1_img = tch::Tensor::cat(&[pred_t1_img.copy(), alpha.copy()], 0);
            let pred_t1_img: tch::Tensor = pred_t1_img.to_kind(tch::Kind::Uint8);
            let pred_t1_img = pred_t1_img.movedim(&[0], &[2]);
            let pred_t1_imgh = image::Handle::from_pixels(256, 256, Vec::<u8>::from(&pred_t1_img));

            let pred_t2_img: tch::Tensor =
                t2.repeat(&[3, 1, 1]) * (1 - pred_mask.copy()) + pred_mask.copy() * 255;
            let pred_t2_img = pred_t2_img.round();
            let pred_t2_img = tch::Tensor::cat(&[pred_t2_img.copy(), alpha.copy()], 0);
            let pred_t2_img: tch::Tensor = pred_t2_img.to_kind(tch::Kind::Uint8);
            let pred_t2_img = pred_t2_img.movedim(&[0], &[2]);
            let pred_t2_imgh = image::Handle::from_pixels(256, 256, Vec::<u8>::from(&pred_t2_img));
            Column::new()
                .push(
                    Container::new(Image::new(pred_t1_imgh))
                        .width(Length::Units(256))
                        .center_x(),
                )
                .push(
                    Container::new(Image::new(pred_t2_imgh))
                        .width(Length::Units(256))
                        .center_x(),
                )
        } else {
            Column::new()
                .push(Text::new("").size(10))
                .push(Text::new("").size(10))
        };

        let main_container = Row::new()
            .push(label_img_container)
            .push(pred_img_container);

        Column::new()
            .padding(20)
            .align_items(Align::Center)
            .push(ctrl)
            .push(Text::new(self.dir_names[self.dir_idx].clone()).size(24))
            .push(
                Slider::new(
                    &mut self.slider,
                    0..=(self.file_num - 1) as i32,
                    self.file_idx as i32,
                    Message::TestMsg,
                )
                .step(1),
            )
            .push(Text::new(self.file_idx.to_string()).size(24))
            .push(main_container)
            .push(
                Button::new(&mut self.segmentation_button, Text::new("segmentation"))
                    .on_press(Message::SegmentationPressed),
            )
            .into()
    }
}
