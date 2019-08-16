class PhotosController < ApplicationController
  def index
    respond_to do |format|
      format.json  { render :json => Photo.all}
    end
  end

  def new
    @photo = Photo.new
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    begin
      @photo = Photo.create(photo_params)
    rescue ArgumentError
      flash[:alert] = 'Invalid photo format'
    else
      if @photo.save
        flash[:notice] = 'Successfully added photo'
      else
        flash[:alert] = 'Unable to add photo'
      end
    ensure
      redirect_to :root
    end
  end

  private 
  def photo_params
    params.require(:photo).permit(:image,:lat, :lng)
  end
end