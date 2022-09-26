;; -*- lexical-binding: t -*-

(require 'cl-lib)

(defun t8/range (start end)
  (let ((range_
         (lambda (start end prev range_)
           (if (< start end)
               (funcall range_ (+ start 1) end (append prev (list start)) range_)
               prev))))
       (funcall range_ start end '() range_)))

(t8/range 1 8)

(defun t8/list-to-string
    (elems delimiter elem-to-str-fn)
    (cl-reduce
       (lambda (prev curr)
         (format "%s%s%s" prev delimiter (funcall elem-to-str-fn curr)))
       (cdr elems)
       :initial-value (funcall elem-to-str-fn (car elems))))

(t8/list-to-string '(1 2 3) " " (lambda (elem) (format "%s" elem)))

;;;###autoload
(defun t8/show-pt
  (elem-to-str-fn) 
  (let* ((p-fn (lambda (n)
                 (let ((_p (lambda (a b)
                             (append a (list (* b (nth 0 (last a))))))))
                      (cl-reduce _p (t8/range 1 (+ n 1)) :initial-value '(1)))))
         (pascals-triangle-fn (lambda (n)   
                                (let ((p (funcall p-fn n)))
                                  (cl-map 'list 
                                    (lambda (i)
                                      (cl-map 'list 
                                        (lambda (j)
                                          (/ (nth i p)
                                            (* (nth j p)
                                              (nth (- i j) p))))
                                        (t8/range 0 (+ i 1))))
                                    (t8/range 0 n)))))
         (show-pt-fn (lambda (n)
                       (t8/list-to-string
                         (let ((slist (cl-map 'list
                                        (lambda (curr)
					  (t8/list-to-string curr " " elem-to-str-fn))
                                        (funcall pascals-triangle-fn n))))
                              (let ((max-len  (length (nth (- n 1) slist))))
                                   (cl-map 'list
                                     (lambda (curr) (s-center max-len curr))
                                     slist)))
                         "\n" (lambda (elem) (format "%s" elem))))))

       (lambda
         (n) "pascals-triangle" (interactive "NOrder:")
         (let
           ((curr-buff (current-buffer)))
           (pop-to-buffer (get-buffer-create "pascals-triangle"))
           (erase-buffer)
           (insert (funcall show-pt-fn n))
           (pop-to-buffer curr-buff)))))

(which-key-add-key-based-replacements "<leader>tp" "pascals-triangle")
(which-key-add-key-based-replacements "<leader>tpd" "decimal")
(evil-define-key '(normal emacs motion) 'global (kbd "<leader>tpd") (t8/show-pt (lambda (elem) (format "%d" elem))))
(which-key-add-key-based-replacements "<leader>tpx" "hex")
(evil-define-key '(normal emacs motion) 'global (kbd "<leader>tpx") (t8/show-pt (lambda (elem) (format "%x" elem))))

(provide 'hw1)