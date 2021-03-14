const shader = (() => {
    /**
     * 
     * @param {WebGL2RenderingContext} gl
     * @param {string} vsSource 
     * @param {string} fsSource
     * @returns 
     */
    const createProgram = (gl, vsSource, fsSource) => {

        /*const canvas = document.createElement("canvas")
        canvas.width = 800
        canvas.height = 600
        document.body.appendChild(canvas)
    
        // 初始化 GL context
        const gl = canvas.getContext("webgl2", {})*/

        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    //
    // creates a shader of the given type, uploads the source and
    // compiles it.
    //
    /**
     * 
     * @param {WebGL2RenderingContext} gl
     * @param {number} type
     * @param {string} source
     * @returns 
     */
    const compileShader = (gl, type, source) => {
        const shader = gl.createShader(type);

        // Send the source to the shader object

        gl.shaderSource(shader, source);

        // Compile the shader program

        gl.compileShader(shader);

        // See if it compiled successfully

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * 
     * @param {number} bones 
     */
    const createShaderSource = (bones) => {
        const vertexShader = `#version 300 es
precision mediump float;

uniform mat4 u_jointMatrix[${bones}];
uniform mat4 u_mvp;

layout (location = 0) in vec3 v_position;
layout (location = 1) in vec4 v_joint;
layout (location = 2) in vec4 v_weight;

void main() {
    mat4 skinMatrix =
        v_weight.x * u_jointMatrix[int(v_joint.x)] +
        v_weight.y * u_jointMatrix[int(v_joint.y)] +
        v_weight.z * u_jointMatrix[int(v_joint.z)] +
        v_weight.w * u_jointMatrix[int(v_joint.w)];
    gl_Position = u_mvp * vec4(v_position, 1.0);
}`
        const fragmentShader = `#version 300 es
precision mediump float;

out vec4 color;

void main()
{
    // color = vec4(result, 1.0f);
}`
        return {
            vertexShader,
            fragmentShader,
        }
    }
    return {
        createProgram,
        createShaderSource,
        compileShader,
    }
})()