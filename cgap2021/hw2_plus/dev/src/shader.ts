export const createProgram = (gl: WebGL2RenderingContext, vsSource: string, fsSource: string) => {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource)

    // Create the shader program

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log(
            "Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram)
        )
        return null
    }

    return shaderProgram
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
export const compileShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)

    // Send the source to the shader object

    gl.shaderSource(shader, source)

    // Compile the shader program

    gl.compileShader(shader)

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }

    return shader
}
