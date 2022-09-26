;; -*- lexical-binding: t -*-

(get-buffer-create "*dynamic vs lexical*")

(setq foo-lexical-var "global value")
(defvar foo-lexical-defvar "global value")

(defvar foo-lexical-value (lambda () foo-lexical-var))
(defvar foo-lexical-defvar-value (lambda () foo-lexical-defvar))

(let
  ((foo-lexical-var "local value")
   (foo-lexical-defvar "local value"))
  (with-current-buffer
    "*dynamic vs lexical*"
    (goto-char (point-max))
    (insert "setq: " (funcall foo-lexical-value) "\n"
            "defvar: " (funcall foo-lexical-defvar-value) "\n\n")))

(setq a-fn (let ((a 1)) (lambda () a)))

(setq a 2)
(funcall a-fn)
